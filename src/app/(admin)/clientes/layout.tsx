import TitlePage from "@/components/title-page";

export default function ClientesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <TitlePage />
      {children}
    </section>
  );
}
