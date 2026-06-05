import { useState } from "react";
import { ArrowLeft, Send, Users } from "lucide-react";
import { ownerConversations, workerConversations, sampleThread, type Conversation } from "@/lib/mock-data";

export function MessagesTab({ role }: { role: "owner" | "worker" }) {
  const [open, setOpen] = useState<Conversation | null>(null);
  const list = role === "owner" ? ownerConversations : workerConversations;

  if (open) return <Thread conversation={open} onBack={() => setOpen(null)} />;

  return (
    <div>
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-lg font-semibold">Messages</h2>
        <p className="text-xs text-muted-foreground">
          {role === "owner" ? "All conversations" : "Groups & dispatch"}
        </p>
      </div>
      <ul className="divide-y divide-border">
        {list.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => setOpen(c)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent text-left"
            >
              <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-semibold ${c.accent}`}>
                {c.isGroup ? <Users className="h-5 w-5" /> : c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm truncate">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground ml-2">{c.time}</div>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <div className="text-xs text-muted-foreground truncate pr-2">{c.preview}</div>
                  {c.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-[10px] font-semibold rounded-full px-1.5 min-w-5 h-5 flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Thread({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem-5rem)]">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <button onClick={onBack} className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${conversation.accent}`}>
          {conversation.isGroup ? <Users className="h-4 w-4" /> : conversation.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{conversation.name}</div>
          <div className="text-[11px] text-muted-foreground">
            {conversation.isGroup ? "Group · 5 members" : "Online"}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-muted/30">
        {sampleThread.map((m) => (
          <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[75%]">
              {!m.mine && conversation.isGroup && (
                <div className="text-[11px] text-muted-foreground mb-0.5 ml-2">{m.sender}</div>
              )}
              <div
                className={`px-3 py-2 rounded-2xl text-sm ${
                  m.mine
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
              <div className={`text-[10px] text-muted-foreground mt-0.5 ${m.mine ? "text-right mr-1" : "ml-2"}`}>
                {m.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-2 flex items-center gap-2 bg-card">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message"
          className="flex-1 px-3 py-2 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
        <button className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
