// components/app-sidebar.tsx
import { ChevronRight, Command, FileText, Settings, Users } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from '@/shared/ui';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    // <Sidebar collapsible="offcanvas" {...props}>
    //   <SidebarContent>
    //     <SidebarGroup>
    //       <SidebarGroupLabel>Навигация</SidebarGroupLabel>
    //       <SidebarMenu>
    //         {/* Пример вложенного меню */}
    //         <Collapsible className="group/collapsible">
    //           <SidebarMenuItem>
    //             <CollapsibleTrigger>
    //               <span>
    //                 <SidebarMenuButton  >
    //                   <FileText />
    //                   <span>Документы</span>
    //                   <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
    //                 </SidebarMenuButton>
    //               </span>
    //             </CollapsibleTrigger>
    //             <CollapsibleContent>
    //               <SidebarMenuSub>
    //                 <SidebarMenuSubItem>
    //                   <SidebarMenuSubButton>
    //                     <a href="/docs/all">Все файлы</a>
    //                   </SidebarMenuSubButton>
    //                 </SidebarMenuSubItem>
    //               </SidebarMenuSub>
    //             </CollapsibleContent>
    //           </SidebarMenuItem>
    //         </Collapsible>
    //       </SidebarMenu>
    //     </SidebarGroup>
    //   </SidebarContent>
    // </Sidebar>
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <Command className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        ffffff
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
