import { useState } from "react";
import { ArrowLeft, Phone, MapPin, Truck as TruckIcon, MessageSquare } from "lucide-react";
import { drivers, type Driver } from "@/lib/mock-data";

export function TeamTab() {
  const [open, setOpen] = useState<Driver | null>(null);
  const [q, setQ] = useState("");

  if (open) return <DriverDetail driver={open} onBack={() => setOpen(null)} />;

  const filtered = drivers.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="px-4 pt-4">
        <h2 className="text-lg font-semibold">Team</h2>
        <p className="text-xs text-muted-foreground">{drivers.length} drivers</p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search drivers"
          className="mt-3 w-full px-3 py-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <ul className="mt-3 divide-y divide-border">
        {filtered.map((d) => (
          <li key={d.id}>
            <button onClick={() => setOpen(d)} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-accent text-left">
              <div className={`h-10 w-10 rounded-full ${d.color} text-white text-xs font-semibold flex items-center justify-center`}>
                {d.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground truncate">{d.vehicle} · {d.phone}</div>
              </div>
              <span className={`h-2.5 w-2.5 rounded-full ${d.online ? "bg-emerald-500" : "bg-destructive"}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DriverDetail({ driver, onBack }: { driver: Driver; onBack: () => void }) {
  return (
    <div>
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <button onClick={onBack} className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium">Driver profile</div>
      </div>

      <div className="px-4 py-6 flex flex-col items-center text-center border-b border-border">
        <div className={`h-20 w-20 rounded-full ${driver.color} text-white text-xl font-semibold flex items-center justify-center`}>
          {driver.initials}
        </div>
        <div className="mt-3 font-semibold text-lg">{driver.name}</div>
        <div className="text-xs text-muted-foreground">{driver.route}</div>
        <div className={`mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${driver.online ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${driver.online ? "bg-emerald-500" : "bg-destructive"}`} />
          {driver.online ? "Online" : "Offline"}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
          <button className="py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-1.5">
            <MessageSquare className="h-4 w-4" /> Message
          </button>
          <button className="py-2 rounded-lg border border-border text-sm font-medium flex items-center justify-center gap-1.5">
            <Phone className="h-4 w-4" /> Call
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        <Row icon={<Phone className="h-4 w-4" />} label="Phone" value={driver.phone} />
        <Row icon={<TruckIcon className="h-4 w-4" />} label="Vehicle" value={driver.vehicle} />
        <Row icon={<MapPin className="h-4 w-4" />} label="Current location" value={driver.location} />
      </div>

      <div className="px-4 pb-6">
        <div className="text-sm font-medium mb-2">Recent activity</div>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex justify-between border-b border-border pb-2"><span>Checked in</span><span>6:42 AM</span></li>
          <li className="flex justify-between border-b border-border pb-2"><span>Started route</span><span>7:05 AM</span></li>
          <li className="flex justify-between border-b border-border pb-2"><span>Completed stop #3</span><span>8:18 AM</span></li>
          <li className="flex justify-between"><span>Last location update</span><span>2 min ago</span></li>
        </ul>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-border">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">{icon}</div>
      <div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
