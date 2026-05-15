import { Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui';
import type { TUserRole } from '@repo/schemas';

export function UserRolesCell({ roles }: { roles: TUserRole[] }) {
  const displayLimit = 3;
  const extraRoles = roles.length - displayLimit;

  return (
    <div className="flex items-center gap-1.5">
      {roles.slice(0, displayLimit).map((role) => (
        <Badge key={role.RolePK} variant="secondary" className="font-normal text-[11px] px-2 py-0">
          {role.RoleAlias}
        </Badge>
      ))}

      {extraRoles > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="cursor-help text-[11px] px-1.5 py-0">
                +{extraRoles}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-1">
                {roles.slice(displayLimit).map((role) => (
                  <span key={role.RolePK}>{role.RoleAlias}</span>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
