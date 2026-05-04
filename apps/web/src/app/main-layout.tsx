// routes/layout.tsx
import { SidebarProvider } from "@/shared/ui"
import { AppSidebar } from "@/widgets/sidebar"
import { AppHeader } from "@/widgets/header"
import { Outlet } from "react-router-dom"
// import { trpc } from "@/utils/trpc"

export default function MainLayout() {
    // const { data: stats } = trpc.docs.getStats.useQuery()

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1">
                <AppHeader
                    docCount={0}
                // stats?.total || 0} 
                />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}