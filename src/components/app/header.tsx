"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { copy } from "@/lib/copy";
import { logout } from "@/app/app/actions";

export function AppHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-zinc-100 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-green-100 text-xs font-semibold text-green-700">
            SG
          </AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="text-sm font-semibold">{copy.app.proName}</p>
          <p className="text-xs text-zinc-400">{copy.app.proSpecialty}</p>
        </div>
      </div>

      <Sheet>
        <SheetTrigger
          className="rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100"
          aria-label="Más opciones"
        >
          <MoreHorizontal className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl px-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menú</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col pb-[env(safe-area-inset-bottom)]">
            <Link
              href="/app/ajustes"
              className="px-6 py-4 text-sm font-medium hover:bg-zinc-50"
            >
              {copy.nav.ajustes}
            </Link>
            <div className="h-px bg-zinc-100" />
            <form action={logout}>
              <button
                type="submit"
                className="w-full px-6 py-4 text-left text-sm font-medium text-red-600 hover:bg-zinc-50"
              >
                {copy.actions.logout}
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
