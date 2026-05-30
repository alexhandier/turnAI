import { AppHeader } from "@/components/app/header";
import { BottomTabBar } from "@/components/app/bottom-tab-bar";

/**
 * Layout for the 4 main tab routes: Inbox, Pacientes, Finanzas, Agenda.
 * Ajustes lives outside this group and omits the bottom bar.
 */
export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomTabBar />
    </>
  );
}
