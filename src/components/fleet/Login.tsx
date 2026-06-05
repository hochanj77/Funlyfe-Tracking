import { useState } from "react";
import { Truck } from "lucide-react";

type Role = "owner" | "worker";

export function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("owner");
  const [email, setEmail] = useState("owner@fleettrack.app");
  const [password, setPassword] = useState("demo1234");

  const setDemo = (r: Role) => {
    setRole(r);
    setEmail(r === "owner" ? "owner@fleettrack.app" : "driver@fleettrack.app");
    setPassword("demo1234");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center mb-3">
            <Truck className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">FleetTrack</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your drivers, in one place.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-1 p-1 bg-muted rounded-xl mb-5">
            {(["owner", "worker"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setDemo(r)}
                className={`text-sm py-2 rounded-lg font-medium capitalize transition-colors ${
                  role === r ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <label className="text-xs font-medium text-muted-foreground">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 mb-4 px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
          <label className="text-xs font-medium text-muted-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 mb-5 px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
          />

          <button
            onClick={() => onLogin(role)}
            className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>

          <div className="mt-5 p-3 rounded-lg bg-muted/60 text-xs text-muted-foreground">
            <div className="font-medium text-foreground mb-1">Demo accounts</div>
            <div>Owner — owner@fleettrack.app</div>
            <div>Worker — driver@fleettrack.app</div>
            <div className="mt-1">Password: demo1234</div>
          </div>
        </div>
      </div>
    </div>
  );
}
