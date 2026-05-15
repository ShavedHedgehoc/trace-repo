import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import {
  TDeleteUserRecordInput,
  TGetUsersListInput,
  TUpdateUserRolesInput,
  TUsersListResponse,
  TUsersListRow,
} from '@repo/schemas';
import { IUserService } from '@repo/trpc';

@Injectable()
export class UserService implements IUserService {
  async getUsers(input: TGetUsersListInput): Promise<TUsersListResponse> {
    const { name, email, roles, page, limit } = input;
    const andConditions: Prisma.UsersWhereInput[] = [];
    if (name !== '') {
      andConditions.push({ UserName: { contains: name.toLowerCase() } });
    }
    if (email !== '') {
      andConditions.push({ UserEmail: { contains: email.toLowerCase() } });
    }

    if (roles && roles.length > 0) {
      andConditions.push({
        UserRoles: {
          some: {
            RolePK: {
              in: roles,
            },
          },
        },
      });
    }

    const where: Prisma.UsersWhereInput = { AND: andConditions };
    const [users, total] = await Promise.all([
      mssqlPrisma.users.findMany({
        where,
        include: {
          UserRoles: {
            include: {
              Roles: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ UserName: 'asc' }],
      }),
      mssqlPrisma.users.count({
        where: { AND: andConditions },
      }),
    ]);
    const totalPages = Math.ceil(total / limit);
    const rows: TUsersListRow[] = users.map((u) => ({
      userId: u.UserPK,
      userName: u.UserName,
      userEmail: u.UserEmail,
      roles: u.UserRoles?.map((ur) => ur.Roles),
    }));
    return { rows, total, totalPages };
  }

  async deleteUser(input: TDeleteUserRecordInput): Promise<{ success: boolean }> {
    const record = await mssqlPrisma.users.findUnique({
      where: { UserPK: input.userId },
    });
    if (!record) throw new Error('Запись не найдена!');
    await mssqlPrisma.users.delete({ where: { UserPK: input.userId } });
    return { success: true };
  }

  async updateUserRoles(input: TUpdateUserRolesInput): Promise<{ success: boolean }> {
    const user = await mssqlPrisma.users.findUnique({
      where: { UserPK: input.userId },
      include: { UserRoles: { include: { Roles: true } } },
    });
    if (!user) {
      throw new Error('Запись не найдена!');
    }
    const currentRolesIds = user.UserRoles.map((ur) => ur.Roles.RolePK);
    const idsToAdd = input.roles.filter((id) => !currentRolesIds.includes(id));
    const idsToRemove = currentRolesIds.filter((id) => !input.roles.includes(id));
    await mssqlPrisma.users.update({
      where: { UserPK: input.userId },
      data: {
        UserRoles: {
          deleteMany: idsToRemove.map((id) => ({
            RolePK: id,
          })),

          create: idsToAdd.map((id) => ({
            Roles: { connect: { RolePK: id } },
          })),
        },
      },
    });
    return { success: true };
  }
}
