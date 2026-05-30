"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, MessageCircle, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { copy } from "@/lib/copy";

const tabs = [
  { href: "/app/inbox", label: copy.nav.inbox, Icon: MessageCircle },
  { href: "/app/pacientes", label: copy.nav.pacientes, Icon: Users },
  { href: "/app/finanzas", label: copy.nav.finanzas, Icon: Wallet },
  { href: "/app/agenda", label: copy.nav.agenda, Icon: Calendar },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="shrink-0 border-t border-zinc-100 bg-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {tabs.map(({ href, label, Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2"
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-colors",
                  active ? "text-green-500" : "text-zinc-400"
                )}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <span
                className={cn(
                  "text-[10px] font-medium",
                  active ? "text-green-500" : "text-zinc-400"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
