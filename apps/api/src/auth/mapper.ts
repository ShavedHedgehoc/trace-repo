import { Prisma } from '@repo/db';

export type UserWithRoles = Prisma.UsersGetPayload<{
  include: { UserRoles: { include: { Roles: true } } };
}>;

export interface IUserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
  // settings: IUserSettings;
}

export const toRegisteredUserData = (user: UserWithRoles): IUserData => {
  return {
    id: user.UserPK,
    name: user.UserName,
    email: user.UserEmail,
    roles: user.UserRoles.map((ur) => ur.Roles.RoleAlias ?? ''),
    // settings: user.user_settings,
  };
};
