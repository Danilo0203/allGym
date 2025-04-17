"use client";
import * as React from "react";
import { NavMain } from "@/components/sidebar/nav-main";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavUser } from "@/components/sidebar/nav-user";
import Image from "next/image";
import { dataSidebar } from "./data-sidebar";
import { User } from "@supabase/supabase-js";
export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User; // o define un tipo más específico si lo tienes
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center p-0">
        <Image src="/img/Logo-Algym-Blanco.png" alt="Logo de AlGym Blanco" width={150} height={150} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataSidebar.navMain} groupLabel="Administración" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser {...user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
