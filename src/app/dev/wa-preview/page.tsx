import { Check, CheckCheck, Mic, Paperclip, Phone, Search, Smile, Video } from "lucide-react";

type Bubble = {
  dir: "in" | "out";
  text: string;
  time: string;
  read?: boolean;
  kind?: "reminder" | "text";
};

const THREAD: Bubble[] = [
  { dir: "in", text: "Hola! Vi tu perfil y me interesa sacar turno para una primera consulta. ¿Tenés disponibilidad esta semana?", time: "9:10" },
  { dir: "in", text: "Me recomendaste una amiga que es paciente tuya. Soy de Palermo, así que me queda bien la zona.", time: "9:15" },
  { dir: "out", text: "¡Hola María! Qué bueno que me escribís. Sí, tengo disponibilidad. ¿Qué días te vienen mejor?", time: "10:02", read: true },
  { dir: "in", text: "Cualquier tarde está bien para mí. ¿Tenés algo el martes o miércoles?", time: "10:18" },
  { dir: "out", text: "¡Perfecto! Tengo el martes 16 a las 17:00 o el miércoles 17 a las 16:00. ¿Cuál te viene mejor? Te mando el link para reservar con señal.", time: "10:25", read: true },
  { dir: "in", text: "El martes a las 17 me queda bárbaro. Dale, mandame el link.", time: "10:31" },
  {
    dir: "out",
    text: "🔗 Reservá tu turno aquí: https://turn-ai.vercel.app/book/sofia-garcia\n\nEl costo del turno es $25.000 y la señal es $7.500. Una vez que reservés, te confirmo por acá. ¡Nos vemos el martes!",
    time: "10:33",
    read: false,
  },
];

const CONTACTS = [
  { name: "María Fernández", last: "El martes a las 17 me queda bárbaro.", time: "10:31", unread: 1, initials: "MF", color: "bg-rose-400" },
  { name: "Lucas Rodríguez", last: "Dale, te confirmo mañana a la mañana.", time: "Ayer", unread: 1, initials: "LR", color: "bg-blue-400" },
  { name: "Camila Pérez", last: "¡Claro que sí! Todo lo que quieras traer.", time: "Lun", unread: 0, initials: "CP", color: "bg-violet-400" },
  { name: "Tomás Álvarez", last: "Dale, sí. Gracias por la buena onda.", time: "Lun", unread: 0, initials: "TA", color: "bg-orange-400" },
  { name: "Florencia Gómez", last: "¡Excelente! Nos vemos en un rato. ☀️", time: "Hoy", unread: 0, initials: "FG", color: "bg-teal-400" },
];

function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <div className={`${s} ${color} flex shrink-0 items-center justify-center rounded-full font-semibold text-white`}>
      {initials}
    </div>
  );
}

function TickIcon({ read }: { read?: boolean }) {
  if (read) return <CheckCheck className="h-3.5 w-3.5 text-wa-tick" />;
  return <Check className="h-3.5 w-3.5 text-zinc-400" />;
}

export default function WaPreviewPage() {
  return (
    <div className="flex h-[calc(100dvh-41px)] overflow-hidden">
      {/* ── Sidebar: chat list ─────────────────────────────────────────────── */}
      <aside className="flex w-[320px] shrink-0 flex-col border-r bg-white">
        {/* Sidebar header */}
        <div className="flex items-center justify-between bg-wa-bg px-4 py-3">
          <Avatar initials="SG" color="bg-wa-primary" size="sm" />
          <div className="flex gap-4 text-zinc-500">
            <Video className="h-5 w-5" />
            <Search className="h-5 w-5" />
          </div>
        </div>

        {/* Search bar */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5">
            <Search className="h-4 w-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">Buscar o empezar un chat</span>
          </div>
        </div>

        {/* Contact list */}
        <ul className="flex-1 overflow-y-auto">
          {CONTACTS.map((c, i) => (
            <li
              key={c.name}
              className={`flex cursor-pointer items-center gap-3 px-3 py-3 hover:bg-zinc-50 ${i === 0 ? "bg-zinc-100" : ""}`}
            >
              <Avatar initials={c.initials} color={c.color} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between">
                  <p className="truncate text-sm font-medium text-zinc-800">{c.name}</p>
                  <span className={`shrink-0 text-[11px] ${c.unread ? "text-wa-primary font-semibold" : "text-zinc-400"}`}>
                    {c.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs text-zinc-500">{c.last}</p>
                  {c.unread > 0 && (
                    <span className="ml-2 flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-wa-primary px-1 text-[10px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Main: thread ───────────────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col">
        {/* Thread header */}
        <header className="flex items-center gap-3 px-4 py-2.5" style={{ background: "#075E54" }}>
          <Avatar initials="MF" color="bg-rose-400" size="sm" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">María Fernández</p>
            <p className="text-[11px] text-green-200">en línea</p>
          </div>
          <div className="flex gap-5 text-white/80">
            <Video className="h-5 w-5" />
            <Phone className="h-5 w-5" />
            <Search className="h-5 w-5" />
          </div>
        </header>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5"
          style={{ background: "#ECE5DD" }}
        >
          {/* Date separator */}
          <div className="flex justify-center py-1">
            <span className="rounded-lg bg-white/80 px-3 py-0.5 text-[11px] text-zinc-500 shadow-sm">
              HOY
            </span>
          </div>

          {THREAD.map((msg, i) => {
            const isOut = msg.dir === "out";
            return (
              <div key={i} className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
                <div
                  className={`relative max-w-[72%] rounded-xl px-3 py-2 shadow-sm ${
                    isOut
                      ? "rounded-tr-none"
                      : "rounded-tl-none"
                  }`}
                  style={{
                    background: isOut ? "#DCF8C6" : "#FFFFFF",
                  }}
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-800">
                    {msg.text}
                  </p>
                  <div className={`mt-0.5 flex items-center gap-1 ${isOut ? "justify-end" : "justify-end"}`}>
                    <span className="text-[10px] text-zinc-400">{msg.time}</span>
                    {isOut && <TickIcon read={msg.read} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply box */}
        <div className="flex items-center gap-2 bg-[#F0F0F0] px-3 py-2.5">
          <button className="shrink-0 text-zinc-500 hover:text-zinc-700">
            <Smile className="h-5 w-5" />
          </button>
          <button className="shrink-0 text-zinc-500 hover:text-zinc-700">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-zinc-400 shadow-sm">
            Escribe un mensaje
          </div>
          <button className="shrink-0 text-zinc-500 hover:text-zinc-700">
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
