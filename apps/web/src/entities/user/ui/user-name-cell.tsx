import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import type { TUsersListRow } from '@repo/schemas';

export function UserNameCell({ user }: { user: TUsersListRow }) {
  const initials = user.userName
    ?.split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex items-center gap-3 text-left pl-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={undefined} alt={user.userName} />
        <AvatarFallback className="text-xs">{initials || 'XX'}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium leading-none">{user.userName}</span>
        <span className="text-xs text-muted-foreground mt-1 leading-none md:hidden">
          {user.userEmail}
        </span>
      </div>
    </div>
  );
}
