// components/header.tsx
import { ToggleTheme } from "@/features/theme"
import { SidebarTrigger, Badge } from "@/shared/ui"
import { Users } from "lucide-react"
// import { ModeToggle } from "./mode-toggle" // Стандартный компонент из доков shadcn

// import { UserNav } from "./user-nav"

export function AppHeader({ docCount }: { docCount: number }) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 gap-2">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="flex items-center gap-2 ml-4">
                    <span className="font-bold text-sm">Прослеживаемость</span>
                    <Badge variant="secondary" className="">
                        {docCount} док.
                    </Badge>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {/* <span>12 активных</span> */}
                </div>
                <ToggleTheme />
                {/* <UserNav />  */}
            </div>
        </header>
    )
}