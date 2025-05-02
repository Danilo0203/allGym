import Header from "@/components/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/utils/supabase/auth/server";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user ?? ({} as User)} />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
