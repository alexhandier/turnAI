import { redirect } from "next/navigation";

// Once F4 ships the app shell, the real routing lives in the layout.
// For now, redirect straight to agenda.
export default function AppRoot() {
  redirect("/app/agenda");
}
