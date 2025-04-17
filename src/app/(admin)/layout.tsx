import DynamicBreadcrumb from "@/components/breadcrumb-dynamic";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/utils/supabase/auth/server";
import { User } from "@supabase/supabase-js";

export default async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const { data } = await getUser();
  return (
    <SidebarProvider>
      <AppSidebar user={data.user ?? ({} as User)} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
