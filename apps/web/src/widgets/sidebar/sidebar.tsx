import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/shared/ui';
import { HedgehogIcon } from '@/shared/assets';
import { useAuth } from '@/app/providers/auth-provider';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { adminNavItems, navItems } from './items';
import { NavAdmin } from './nav-admin';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <HedgehogIcon className="size-5!" />
                <span className="text-base font-semibold">Прослеживаемость 2.0</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        {user.roles.includes('Администратор') && <NavAdmin items={adminNavItems} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
