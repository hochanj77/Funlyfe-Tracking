export type Driver = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  vehicle: string;
  route: string;
  online: boolean;
  location: string;
  color: string;
  pin: { x: number; y: number };
  coords: { lat: number; lng: number };
  hex: string;
};

// Coordinates around Newark, NJ
export const drivers: Driver[] = [
  { id: "d1", name: "Marcus Chen", initials: "MC", phone: "(555) 201-3344", vehicle: "Truck 04", route: "Route A · Downtown", online: true, location: "Broad St & Market St", color: "bg-blue-500", hex: "#3b82f6", pin: { x: 25, y: 40 }, coords: { lat: 40.7357, lng: -74.1724 } },
  { id: "d2", name: "Sofia Reyes", initials: "SR", phone: "(555) 482-9120", vehicle: "Van 12", route: "Route B · Ironbound", online: true, location: "Ferry St", color: "bg-emerald-500", hex: "#10b981", pin: { x: 60, y: 28 }, coords: { lat: 40.7282, lng: -74.1573 } },
  { id: "d3", name: "James Okafor", initials: "JO", phone: "(555) 776-1188", vehicle: "Truck 07", route: "Route C · North Newark", online: true, location: "Mt Prospect Ave", color: "bg-amber-500", hex: "#f59e0b", pin: { x: 72, y: 55 }, coords: { lat: 40.7610, lng: -74.1810 } },
  { id: "d4", name: "Priya Shah", initials: "PS", phone: "(555) 309-4421", vehicle: "Van 03", route: "Route D · Airport", online: true, location: "Newark Liberty Intl", color: "bg-rose-500", hex: "#f43f5e", pin: { x: 40, y: 65 }, coords: { lat: 40.6895, lng: -74.1745 } },
  { id: "d5", name: "Liam O'Brien", initials: "LO", phone: "(555) 661-9087", vehicle: "Truck 11", route: "Route E · Port Newark", online: false, location: "Last seen: Port St", color: "bg-violet-500", hex: "#8b5cf6", pin: { x: 18, y: 72 }, coords: { lat: 40.6920, lng: -74.1390 } },
];

export type Attendance = "present" | "absent" | "pending";
export const attendance: Record<string, { status: Attendance; time?: string }> = {
  d1: { status: "present", time: "6:42 AM" },
  d2: { status: "present", time: "6:51 AM" },
  d3: { status: "present", time: "7:03 AM" },
  d4: { status: "present", time: "6:58 AM" },
  d5: { status: "absent" },
};

export type Conversation = {
  id: string;
  name: string;
  isGroup: boolean;
  preview: string;
  time: string;
  unread: number;
  initials: string;
  accent: string;
};

export const ownerConversations: Conversation[] = [
  { id: "c1", name: "Morning Shift Group", isGroup: true, preview: "Sofia: Heading to the warehouse now", time: "9:42 AM", unread: 3, initials: "MS", accent: "bg-primary/10 text-primary" },
  { id: "c2", name: "Dispatch", isGroup: true, preview: "You: Pickup confirmed for 11:00", time: "9:21 AM", unread: 0, initials: "DP", accent: "bg-emerald-100 text-emerald-700" },
  { id: "c3", name: "Marcus Chen", isGroup: false, preview: "On my way to the next stop", time: "8:58 AM", unread: 1, initials: "MC", accent: "bg-blue-100 text-blue-700" },
  { id: "c4", name: "Priya Shah", isGroup: false, preview: "Terminal 2 traffic is heavy", time: "8:30 AM", unread: 0, initials: "PS", accent: "bg-rose-100 text-rose-700" },
  { id: "c5", name: "Route C Team", isGroup: true, preview: "James: Fuel stop in 10 mins", time: "Yesterday", unread: 0, initials: "RC", accent: "bg-amber-100 text-amber-700" },
  { id: "c6", name: "Diego Martinez", isGroup: false, preview: "All packages delivered ✓", time: "Yesterday", unread: 0, initials: "DM", accent: "bg-orange-100 text-orange-700" },
];

export const workerConversations: Conversation[] = [
  { id: "c1", name: "Morning Shift Group", isGroup: true, preview: "Sofia: Heading to the warehouse now", time: "9:42 AM", unread: 3, initials: "MS", accent: "bg-primary/10 text-primary" },
  { id: "c2", name: "Dispatch", isGroup: true, preview: "Pickup confirmed for 11:00", time: "9:21 AM", unread: 0, initials: "DP", accent: "bg-emerald-100 text-emerald-700" },
  { id: "co", name: "Owner (Alex Park)", isGroup: false, preview: "Great work today", time: "Yesterday", unread: 0, initials: "AP", accent: "bg-primary/10 text-primary" },
];

export type Message = { id: string; sender: string; text: string; mine: boolean; time: string };

export const sampleThread: Message[] = [
  { id: "m1", sender: "Sofia Reyes", text: "Heading to the warehouse now", mine: false, time: "9:40 AM" },
  { id: "m2", sender: "James Okafor", text: "Copy. I'll meet you at dock 3.", mine: false, time: "9:41 AM" },
  { id: "m3", sender: "You", text: "Sounds good — keep me posted.", mine: true, time: "9:42 AM" },
  { id: "m4", sender: "Marcus Chen", text: "Just finished route A, heading back.", mine: false, time: "9:45 AM" },
];
