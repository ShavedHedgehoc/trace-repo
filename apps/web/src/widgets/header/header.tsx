// components/header.tsx
import { ToggleTheme } from '@/features/theme';
import { useRouteTitle } from '@/shared/lib';
import { SidebarTrigger, Badge, Separator } from '@/shared/ui';
import { Users } from 'lucide-react';
// import { ModeToggle } from "./mode-toggle" // Стандартный компонент из доков shadcn

// import { UserNav } from "./user-nav"

export function AppHeader() {
  const title = useRouteTitle()
  return (

    // <header className="flex h-16 shrink-0 items-center justify-between border-0 px-4 gap-2">
    //   <div className="flex items-center gap-2">
    //     <SidebarTrigger />
    //     <div className="flex items-center gap-2 ml-4">
    //       <span className="font-bold text-sm">Прослеживаемость</span>
    //       <Badge variant="secondary" className="">
    //         {docCount} док.
    //       </Badge>
    //     </div>
    //   </div>

    //   <div className="flex items-center gap-4">
    //     <div className="flex items-center gap-2 text-sm text-muted-foreground">
    //       <Users className="h-4 w-4" />
    //       {/* <span>12 активных</span> */}
    //     </div>
    //     <ToggleTheme />
    //     {/* <UserNav />  */}
    //   </div>
    // </header>
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ToggleTheme />
        </div>
      </div>
    </header>

  );
}
