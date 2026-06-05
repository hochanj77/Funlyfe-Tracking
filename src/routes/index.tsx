import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Login } from "@/components/fleet/Login";
import { Shell } from "@/components/fleet/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FleetTrack — Manage your drivers" },
      { name: "description", content: "Mobile-first fleet management for owners and drivers." },
      { property: "og:title", content: "FleetTrack" },
      { property: "og:description", content: "Mobile-first fleet management for owners and drivers." },
    ],
  }),
  component: Index,
});

type Role = "owner" | "worker";

function Index() {
  const [role, setRole] = useState<Role | null>(null);
  if (!role) return <Login onLogin={setRole} />;
  return <Shell role={role} onLogout={() => setRole(null)} />;
}
