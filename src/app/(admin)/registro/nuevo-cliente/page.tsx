import { TabsNuevoCliente } from "@/components/tabs-nuevo-cliente";
import TitlePage from "@/components/title-page";
import React from "react";

export default function RegistroPage() {
  return (
    <section className="flex flex-col gap-4 h-full">
      <TitlePage />
      <TabsNuevoCliente />
    </section>
  );
}
