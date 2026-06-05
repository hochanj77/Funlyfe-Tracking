import { useState, type ReactNode } from "react";
import { Map, MessageSquare, CalendarCheck, Users, User, Settings, LogOut, Truck } from "lucide-react";
import { OwnerMap, WorkerMap } from "./MapTab";
import { MessagesTab } from "./MessagesTab";
import { OwnerAttendance, WorkerAttendance } from "./AttendanceTab";
import { TeamTab } from "./TeamTab";
import { ProfileTab } from "./ProfileTab";

type Role = "owner" | "worker";
type Tab = "map" | "messages" | "attendance" | "team";

export function Shell({ role, onLogout }: { role: Role; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("map");
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs: { id: Tab; label: string; icon: typeof Map }[] =
    role === "owner"
      ? [
          { id: "map", label: "Map", icon: Map },
          { id: "messages", label: "Messages", icon: MessageSquare },
          { id: "attendance", label: "Attendance", icon: CalendarCheck },
          { id: "team", label: "Team", icon: Users },
        ]
      : [
          { id: "map", label: "Map", icon: Map },
          { id: "messages", label: "Messages", icon: MessageSquare },
          { id: "attendance", label: "Attendance", icon: CalendarCheck },
          { id: "team", label: "Profile", icon: User },
        ];

  let content: ReactNode = null;
  if (tab === "map") content = role === "owner" ? <OwnerMap /> : <WorkerMap />;
  else if (tab === "messages") content = <MessagesTab role={role} />;
  else if (tab === "attendance") content = role === "owner" ? <OwnerAttendance /> : <WorkerAttendance />;
  else if (tab === "team") content = role === "owner" ? <TeamTab /> : <ProfileTab />;

  return (
    <div className="min-h-screen flex flex-col bg-background max-w-md mx-auto border-x border-border relative">
      {/* Header */}
      <header className="sticky top-0 z-[1100] bg-primary text-primary-foreground backdrop-blur border-b border-primary/30 px-4 h-14 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/15 flex items-center justify-center">
            <Truck className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="font-semibold">Funlyfe</div>
          <span
            className={`ml-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
              role === "owner" ? "bg-white/20 text-primary-foreground" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {role}
          </span>
        </div>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25"
        >
          <Settings className="h-4 w-4 text-primary-foreground" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-[1000]" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-3 top-14 z-[1001] w-52 bg-card text-foreground border border-border rounded-xl shadow-lg overflow-hidden">
              <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border">
                Signed in as <span className="font-medium text-foreground capitalize">{role}</span>
              </div>
              <button className="w-full text-left px-3 py-2.5 text-sm hover:bg-accent flex items-center gap-2">
                <User className="h-4 w-4" /> Profile
              </button>
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2.5 text-sm hover:bg-accent flex items-center gap-2 text-destructive"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          </>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 pb-20">{content}</main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-30">
        <div className="grid grid-cols-4">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-col items-center gap-1 py-3 text-xs ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
                <span className={active ? "font-semibold" : ""}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
