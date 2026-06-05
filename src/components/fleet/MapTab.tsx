import { useState } from "react";
import { ChevronDown, ChevronUp, Navigation } from "lucide-react";
import { drivers } from "@/lib/mock-data";

function MapCanvas({ pins }: { pins: { id: string; x: number; y: number; color: string; initials: string; label?: boolean }[] }) {
  return (
    <div className="relative w-full h-[55vh] bg-muted overflow-hidden">
      {/* Faux map grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--border) 80%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 80%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Faux roads */}
      <div className="absolute left-0 right-0 top-1/3 h-3 bg-card/80" />
      <div className="absolute left-0 right-0 top-2/3 h-2 bg-card/70" />
      <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-card/80" />
      <div className="absolute top-0 bottom-0 left-2/3 w-2 bg-card/70" />

      <div className="absolute top-3 left-3 bg-card/90 backdrop-blur px-2.5 py-1 rounded-md text-[11px] text-muted-foreground border border-border">
        Live Map
      </div>

      {pins.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div className={`h-8 w-8 rounded-full ${p.color} text-white text-[11px] font-semibold flex items-center justify-center border-2 border-card shadow-md`}>
            {p.initials}
          </div>
          <div className="mx-auto h-2 w-2 rotate-45 -mt-1 bg-card border-r border-b border-border" />
        </div>
      ))}
    </div>
  );
}

export function OwnerMap() {
  const [open, setOpen] = useState(true);
  const [focused, setFocused] = useState<string | null>(null);
  const active = drivers.filter((d) => d.online);

  return (
    <div>
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Today</div>
          <div className="font-semibold">{active.length} drivers active</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </div>
      </div>

      <MapCanvas pins={drivers.map((d) => ({ id: d.id, x: d.pin.x, y: d.pin.y, color: focused && focused !== d.id ? "bg-slate-400" : d.color, initials: d.initials }))} />

      <div className="px-4 pt-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-sm font-medium"
        >
          <span>Active drivers</span>
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
        {open && (
          <ul className="mt-3 space-y-2">
            {drivers.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => setFocused(focused === d.id ? null : d.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${
                    focused === d.id ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                  }`}
                >
                  <div className={`h-9 w-9 rounded-full ${d.color} text-white text-xs font-semibold flex items-center justify-center`}>
                    {d.initials}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.vehicle} · {d.route}</div>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${d.online ? "bg-emerald-500" : "bg-destructive"}`} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function WorkerMap() {
  const me = drivers[0];
  return (
    <div>
      <div className="px-4 pt-3 pb-2">
        <div className="text-xs text-muted-foreground">Your route</div>
        <div className="font-semibold">{me.route}</div>
      </div>
      <MapCanvas pins={[{ id: me.id, x: me.pin.x, y: me.pin.y, color: me.color, initials: me.initials }]} />
      <div className="px-4 pt-4 space-y-3">
        <div className="p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Navigation className="h-4 w-4 text-primary" /> Current location
          </div>
          <div className="text-sm text-muted-foreground mt-1">{me.location}</div>
        </div>
        <div className="p-4 rounded-xl border border-border">
          <div className="text-sm font-medium mb-2">Next stops</div>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary font-medium">1.</span> Pickup — Warehouse 3</li>
            <li className="flex gap-2"><span className="text-primary font-medium">2.</span> Drop-off — 220 Pine St</li>
            <li className="flex gap-2"><span className="text-primary font-medium">3.</span> Return — Depot</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
