// components/app-sidebar.tsx
import { ChevronRight, FileText, Settings, Users } from "lucide-react"
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
} from "@/shared/ui"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Навигация</SidebarGroupLabel>
                    <SidebarMenu>
                        {/* Пример вложенного меню */}
                        <Collapsible className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger>
                                    <SidebarMenuButton tooltip="Документы">
                                        <FileText />
                                        <span>Документы</span>
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>
                                                <a href="/docs/all">Все файлы</a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}