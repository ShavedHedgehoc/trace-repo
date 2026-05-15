import { Injectable } from '@nestjs/common';
import { mssqlPrisma } from '@repo/db';
import { TRolesListResponse, TRolesListRow } from '@repo/schemas';
import { IRoleService } from '@repo/trpc';

@Injectable()
export class RoleService implements IRoleService {
  async getRoles(): Promise<TRolesListResponse> {
    const roles = await mssqlPrisma.roles.findMany();
    const rows: TRolesListRow[] = roles.map((r) => ({
      roleId: r.RolePK,
      roleName: r.RoleName,
      roleAlias: r.RoleAlias,
    }));

    return { rows };
  }
}
