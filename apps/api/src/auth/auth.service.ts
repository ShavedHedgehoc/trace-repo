import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mssqlPrisma } from '@repo/db';
import type { TLoginInput, TLoginResponse, TRegisteredUser, TRegisterInput } from '@repo/schemas';
import * as bcrypt from 'bcryptjs';
import type { UserWithRoles } from './mapper';
import * as mapper from './mapper';
import { IAuthService } from '@repo/trpc';

@Injectable()
export class AuthService implements IAuthService {
  private readonly jwtService = new JwtService();

  private async validateUser(input: TLoginInput): Promise<UserWithRoles> {
    const user = await mssqlPrisma.users.findUnique({
      where: { UserEmail: input.email },
      include: { UserRoles: { include: { Roles: true } } },
    });
    if (!user) {
      throw new HttpException('Пользователь с таким email не найден', HttpStatus.NOT_FOUND);
    }

    const passEquals = await bcrypt.compare(input.password, user.UserPassword);
    if (user && passEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Некорректный пароль' });
  }

  private generateTokens = async (user: UserWithRoles) => {
    const payload = {
      email: user.UserEmail,
      id: user.UserPK,
      roles: user.UserRoles.map((ur) => ur.Roles.RoleAlias),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'JWT_ACCESS_SECRET',
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'JWT_REFRESH_SECRET',
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };

  async me(userId: number): Promise<TRegisteredUser> {
    const user = await mssqlPrisma.users.findUnique({
      where: { UserPK: userId },
      include: { UserRoles: { include: { Roles: true } } },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    return mapper.toRegisteredUserData(user);
  }

  async login(input: TLoginInput): Promise<TLoginResponse> {
    const user = await this.validateUser(input);
    const tokens = await this.generateTokens(user);
    const existingToken = await mssqlPrisma.tokens.findFirst({
      where: { UserPK: user.UserPK },
    });

    if (existingToken) {
      await mssqlPrisma.tokens.update({
        where: { TokenPK: existingToken.TokenPK },
        data: { TokenData: tokens.refreshToken },
      });
    } else {
      await mssqlPrisma.tokens.create({
        data: { UserPK: user.UserPK, TokenData: tokens.refreshToken },
      });
    }

    return {
      user: mapper.toRegisteredUserData(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(refreshToken: string): Promise<{ success: boolean }> {
    try {
      const existingToken = await mssqlPrisma.tokens.findUnique({
        where: { TokenData: refreshToken },
      });

      if (existingToken) {
        await mssqlPrisma.tokens.delete({
          where: { TokenPK: existingToken.TokenPK },
        });
      }
    } catch (dbError) {
      console.error('Ошибка ограничений БД при удалении токена сессии:', dbError);
    }
    return { success: true };
  }

  async refresh(oldToken: string): Promise<TLoginResponse> {
    // to prevent infinite session need to add Expire field to token table
    const tokenInDb = await mssqlPrisma.tokens.findUnique({
      where: { TokenData: oldToken },
    });

    if (!tokenInDb) {
      throw new Error('Невалидная сессия');
    }

    try {
      await this.jwtService.verify(oldToken, { secret: 'JWT_REFRESH_SECRET' });
    } catch (_error) {
      await mssqlPrisma.tokens.delete({ where: { TokenPK: tokenInDb.TokenPK } }).catch(() => { });
      throw new Error('Сессия истекла');
    }

    const userId = tokenInDb.UserPK;

    const user = await mssqlPrisma.users.findUnique({
      where: { UserPK: userId },
      include: {
        UserRoles: {
          include: { Roles: true },
        },
      },
    });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const tokens = await this.generateTokens(user);
    await mssqlPrisma
      .$transaction([
        mssqlPrisma.tokens.delete({ where: { TokenPK: tokenInDb.TokenPK } }),
        mssqlPrisma.tokens.create({
          data: {
            TokenData: tokens.refreshToken,
            UserPK: user.UserPK,
          },
        }),
      ])
      .catch((err) => {
        console.error('Ошибка при ротации токенов в БД:', err);
        throw new Error('Ошибка обновления сессии в базе данных');
      });

    return {
      user: mapper.toRegisteredUserData(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async register(input: TRegisterInput): Promise<TLoginResponse> {
    const candidate = await mssqlPrisma.users.findUnique({ where: { UserEmail: input.email } });
    if (candidate) throw new Error('Пользователь с таким email уже существует!');

    const hashPassword = await bcrypt.hash(input.password, 5);
    const user = await mssqlPrisma.users.create({
      data: {
        UserName: input.name,
        UserEmail: input.email,
        UserPassword: hashPassword,
        UserRoles: {
          create: {
            Roles: {
              connect: {
                RoleName: 'User',
              },
            },
          },
        },
      },
      include: { UserRoles: { include: { Roles: true } } },
    });

    const tokens = await this.generateTokens(user);

    await mssqlPrisma.tokens.create({
      data: { UserPK: user.UserPK, TokenData: tokens.refreshToken },
    });

    return {
      user: mapper.toRegisteredUserData(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
