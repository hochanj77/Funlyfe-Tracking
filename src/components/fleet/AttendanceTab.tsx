import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Clock } from "lucide-react";
import { drivers, attendance as initial } from "@/lib/mock-data";

export function OwnerAttendance() {
  const [att, setAtt] = useState(initial);
  const present = Object.values(att).filter((a) => a.status === "present").length;
  const absent = Object.values(att).filter((a) => a.status === "absent").length;
  const pending = Object.values(att).filter((a) => a.status === "pending").length;

  const mark = (id: string) =>
    setAtt({ ...att, [id]: { status: "present", time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) } });

  return (
    <div>
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between bg-muted rounded-xl px-3 py-2">
          <button className="h-7 w-7 rounded-full hover:bg-card flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm font-medium">Today · Fri, Jun 5</div>
          <button className="h-7 w-7 rounded-full hover:bg-card flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <Stat label="Present" value={present} color="text-emerald-700 bg-emerald-50" />
          <Stat label="Absent" value={absent} color="text-rose-700 bg-rose-50" />
          <Stat label="Pending" value={pending} color="text-muted-foreground bg-muted" />
        </div>
      </div>

      <ul className="mt-3 divide-y divide-border">
        {drivers.map((d) => {
          const a = att[d.id];
          return (
            <li key={d.id} className="px-4 py-3 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full ${d.color} text-white text-xs font-semibold flex items-center justify-center`}>
                {d.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.vehicle}</div>
              </div>
              {a.status === "present" && (
                <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Check className="h-3 w-3" /> {a.time}
                </div>
              )}
              {a.status === "absent" && (
                <div className="text-xs font-medium text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">Absent</div>
              )}
              {a.status === "pending" && (
                <button
                  onClick={() => mark(d.id)}
                  className="text-xs font-medium text-primary border border-primary/30 px-2.5 py-1 rounded-full hover:bg-primary/5"
                >
                  Mark present
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 ${color}`}>
      <div className="text-lg font-semibold leading-none">{value}</div>
      <div className="text-[11px] mt-1">{label}</div>
    </div>
  );
}

export function WorkerAttendance() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [time, setTime] = useState("6:42 AM");
  const toggle = () => {
    if (checkedIn) setCheckedIn(false);
    else {
      setCheckedIn(true);
      setTime(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    }
  };

  return (
    <div className="px-4 pt-6">
      <div className="text-xs text-muted-foreground">Today · Fri, Jun 5</div>
      <h2 className="text-xl font-semibold mt-0.5">Your attendance</h2>

      <div className={`mt-5 rounded-2xl border p-5 ${checkedIn ? "bg-emerald-50 border-emerald-200" : "bg-muted border-border"}`}>
        <div className="flex items-center gap-2 text-sm">
          <span className={`h-2.5 w-2.5 rounded-full ${checkedIn ? "bg-emerald-500" : "bg-muted-foreground"}`} />
          <span className="font-medium">{checkedIn ? "Checked in" : "Not checked in"}</span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-3xl font-semibold tracking-tight">
          <Clock className="h-6 w-6 text-muted-foreground" />
          {checkedIn ? time : "—"}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {checkedIn ? "Check-in time" : "Tap below to start your shift"}
        </div>
      </div>

      <button
        onClick={toggle}
        className={`mt-5 w-full py-4 rounded-2xl text-base font-semibold transition-colors ${
          checkedIn ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {checkedIn ? "Check Out" : "Check In"}
      </button>

      <div className="mt-6 text-sm">
        <div className="font-medium mb-2">This week</div>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex justify-between"><span>Mon</span><span className="text-emerald-700">Present · 6:38 AM</span></li>
          <li className="flex justify-between"><span>Tue</span><span className="text-emerald-700">Present · 6:45 AM</span></li>
          <li className="flex justify-between"><span>Wed</span><span className="text-emerald-700">Present · 6:51 AM</span></li>
          <li className="flex justify-between"><span>Thu</span><span className="text-emerald-700">Present · 6:40 AM</span></li>
          <li className="flex justify-between"><span>Fri</span><span className="text-foreground font-medium">Today</span></li>
        </ul>
      </div>
    </div>
  );
}
