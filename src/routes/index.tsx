import { createFileRoute } from "@tanstack/react-router";
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

function Index() {
  return <Shell role="owner" onLogout={() => {}} />;
}
