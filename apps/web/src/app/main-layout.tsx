// routes/layout.tsx
import { SidebarInset, SidebarProvider } from '@/shared/ui';
import { AppSidebar } from '@/widgets/sidebar';
import { AppHeader } from '@/widgets/header';
import { Outlet } from 'react-router-dom';
// import { trpc } from "@/utils/trpc"

export default function MainLayout() {
  // const { data: stats } = trpc.docs.getStats.useQuery()

  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      {/* <AppHeader
        docCount={0}
      // stats?.total || 0}
      /> */}
      <SidebarInset>
        <AppHeader
          docCount={0}
        // stats?.total || 0}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
      {/* <div className="flex flex-col flex-1">
        <AppHeader
          docCount={0}
        // stats?.total || 0}
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div> */}
    </SidebarProvider>
  );
}
