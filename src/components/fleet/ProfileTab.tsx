import { Phone, Truck as TruckIcon, MapPin } from "lucide-react";
import { drivers } from "@/lib/mock-data";

export function ProfileTab() {
  const me = drivers[0];
  return (
    <div>
      <div className="px-4 py-6 flex flex-col items-center text-center border-b border-border">
        <div className={`h-20 w-20 rounded-full ${me.color} text-white text-xl font-semibold flex items-center justify-center`}>
          {me.initials}
        </div>
        <div className="mt-3 font-semibold text-lg">{me.name}</div>
        <div className="text-xs text-muted-foreground">Driver · {me.route}</div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        <Row icon={<Phone className="h-4 w-4" />} label="Phone" value={me.phone} />
        <Row icon={<TruckIcon className="h-4 w-4" />} label="Vehicle assigned" value={me.vehicle} />
        <Row icon={<MapPin className="h-4 w-4" />} label="Current location" value={me.location} />
      </div>

      <div className="px-4 pb-6">
        <div className="text-sm font-medium mb-2">Today</div>
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Stops" value="7" />
          <Stat label="Miles" value="48" />
          <Stat label="Hours" value="3.2" />
        </div>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted px-3 py-2.5 text-center">
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
