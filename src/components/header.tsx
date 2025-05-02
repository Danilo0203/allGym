import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumb from "@/components/breadcrumb-dynamic";
import { ModeToggle } from "./theme/switch-theme";
import SearchInput from "@/components/search-input";
// import { UserNav } from "@/components/user-nav";
// import { ThemeSelector } from "@/components/theme-selector";

export default async function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 py-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumb />
      </div>
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <ModeToggle />
        {/* <ThemeSelector /> */}
      </div>
    </header>
  );
}
