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
};

export const drivers: Driver[] = [
  { id: "d1", name: "Marcus Chen", initials: "MC", phone: "(555) 201-3344", vehicle: "Truck 04", route: "Route A · Downtown", online: true, location: "5th Ave & Main St", color: "bg-blue-500", pin: { x: 25, y: 40 } },
  { id: "d2", name: "Sofia Reyes", initials: "SR", phone: "(555) 482-9120", vehicle: "Van 12", route: "Route B · Warehouse", online: true, location: "Industrial Park", color: "bg-emerald-500", pin: { x: 60, y: 28 } },
  { id: "d3", name: "James Okafor", initials: "JO", phone: "(555) 776-1188", vehicle: "Truck 07", route: "Route C · North", online: true, location: "Highway 9 North", color: "bg-amber-500", pin: { x: 72, y: 55 } },
  { id: "d4", name: "Priya Shah", initials: "PS", phone: "(555) 309-4421", vehicle: "Van 03", route: "Route D · Airport", online: true, location: "Terminal 2", color: "bg-rose-500", pin: { x: 40, y: 65 } },
  { id: "d5", name: "Liam O'Brien", initials: "LO", phone: "(555) 661-9087", vehicle: "Truck 11", route: "Route E · Harbor", online: false, location: "Last seen: Pier 4", color: "bg-violet-500", pin: { x: 18, y: 72 } },
  { id: "d6", name: "Aiko Tanaka", initials: "AT", phone: "(555) 224-5510", vehicle: "Van 08", route: "Route F · East", online: true, location: "Park Blvd", color: "bg-cyan-500", pin: { x: 82, y: 38 } },
  { id: "d7", name: "Diego Martinez", initials: "DM", phone: "(555) 138-2244", vehicle: "Truck 02", route: "Route G · South", online: true, location: "Market St", color: "bg-orange-500", pin: { x: 50, y: 50 } },
  { id: "d8", name: "Hannah Weiss", initials: "HW", phone: "(555) 994-3321", vehicle: "Van 15", route: "Route H · Loop", online: true, location: "Civic Center", color: "bg-pink-500", pin: { x: 35, y: 22 } },
  { id: "d9", name: "Noah Bennett", initials: "NB", phone: "(555) 552-8810", vehicle: "Truck 09", route: "Route I · Express", online: false, location: "Offline since 7:42 AM", color: "bg-slate-500", pin: { x: 65, y: 78 } },
];

export type Attendance = "present" | "absent" | "pending";
export const attendance: Record<string, { status: Attendance; time?: string }> = {
  d1: { status: "present", time: "6:42 AM" },
  d2: { status: "present", time: "6:51 AM" },
  d3: { status: "present", time: "7:03 AM" },
  d4: { status: "present", time: "6:58 AM" },
  d5: { status: "absent" },
  d6: { status: "present", time: "7:11 AM" },
  d7: { status: "present", time: "6:39 AM" },
  d8: { status: "present", time: "7:22 AM" },
  d9: { status: "pending" },
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
