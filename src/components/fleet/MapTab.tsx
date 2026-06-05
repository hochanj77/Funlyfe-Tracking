import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, ChevronUp, Navigation } from "lucide-react";
import { drivers, type Driver } from "@/lib/mock-data";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const NEWARK_CENTER: [number, number] = [40.7282, -74.1724];

function makeIcon(hex: string, initials: string, dimmed = false) {
  const color = dimmed ? "#94a3b8" : hex;
  const html = `
    <div style="position:relative;transform:translate(-50%,-100%);">
      <div style="height:34px;width:34px;border-radius:9999px;background:${color};color:white;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,.25);">${initials}</div>
      <div style="width:8px;height:8px;background:white;transform:rotate(45deg);margin:-4px auto 0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;"></div>
      <div style="position:absolute;inset:auto 0 8px 0;margin:auto;width:34px;height:34px;border-radius:9999px;background:${color};opacity:.35;animation:pulse-ring 2s ease-out infinite;pointer-events:none;"></div>
    </div>
    <style>@keyframes pulse-ring{0%{transform:scale(.6);opacity:.5}100%{transform:scale(2);opacity:0}}</style>
  `;
  return L.divIcon({ html, className: "", iconSize: [0, 0] });
}

type LiveDriver = Driver & { live: { lat: number; lng: number } };

function AnimatedMarker({ d, dimmed }: { d: LiveDriver; dimmed: boolean }) {
  const icon = useMemo(() => makeIcon(d.hex, d.initials, dimmed), [d.hex, d.initials, dimmed]);
  return <Marker position={[d.live.lat, d.live.lng]} icon={icon} />;
}

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length) map.fitBounds(coords, { padding: [40, 40] });
  }, [map, coords]);
  return null;
}

function useAnimatedDrivers(source: Driver[]) {
  const [live, setLive] = useState(() =>
    source.map((d) => ({ ...d, live: { ...d.coords } }))
  );
  const targets = useRef(source.map((d) => ({ ...d.coords })));

  useEffect(() => {
    const pickTarget = (i: number) => {
      const base = source[i].coords;
      targets.current[i] = {
        lat: base.lat + (Math.random() - 0.5) * 0.008,
        lng: base.lng + (Math.random() - 0.5) * 0.008,
      };
    };
    const id = setInterval(() => {
      setLive((prev) =>
        prev.map((d, i) => {
          const t = targets.current[i];
          const dLat = t.lat - d.live.lat;
          const dLng = t.lng - d.live.lng;
          if (Math.abs(dLat) < 0.0002 && Math.abs(dLng) < 0.0002) pickTarget(i);
          return {
            ...d,
            live: {
              lat: d.live.lat + dLat * 0.05,
              lng: d.live.lng + dLng * 0.05,
            },
          };
        })
      );
    }, 80);
    return () => clearInterval(id);
  }, [source]);

  return live;
}

function MapCanvas({ drivers: list, focused }: { drivers: Driver[]; focused: string | null }) {
  const live = useAnimatedDrivers(list);
  const bounds = useMemo(
    () => list.map((d) => [d.coords.lat, d.coords.lng] as [number, number]),
    [list]
  );

  return (
    <div className="relative w-full h-[55vh] overflow-hidden">
      <MapContainer
        center={NEWARK_CENTER}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {list.length > 1 && <FitBounds coords={bounds} />}
        {live.map((d) => (
          <AnimatedMarker key={d.id} d={d} dimmed={!!focused && focused !== d.id} />
        ))}
      </MapContainer>
      <div className="absolute top-3 left-3 z-[400] bg-card/90 backdrop-blur px-2.5 py-1 rounded-md text-[11px] text-muted-foreground border border-border shadow-sm">
        Live Map · Newark, NJ
      </div>
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
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
        </div>
      </div>

      <MapCanvas drivers={drivers} focused={focused} />

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
      <MapCanvas drivers={[me]} focused={null} />
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
