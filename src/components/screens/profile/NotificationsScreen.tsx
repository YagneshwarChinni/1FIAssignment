import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

const notifGroups = [
  {
    title: "Transactions",
    items: [
      { id: "payment", label: "Payment Alerts", sub: "Get notified for every payment" },
      { id: "emi", label: "EMI Reminders", sub: "3 days before due date" },
      { id: "credit", label: "Money Received", sub: "When money is credited" },
    ],
  },
  {
    title: "Offers & Updates",
    items: [
      { id: "offers", label: "Exclusive Offers", sub: "Cashback and discount alerts" },
      { id: "products", label: "New Products", sub: "Latest deals in Marketplace" },
      { id: "app", label: "App Updates", sub: "Feature releases and news" },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "login", label: "Login Alerts", sub: "New device sign-in notifications" },
      { id: "card", label: "Card Activity", sub: "Unusual card usage alerts" },
    ],
  },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${on ? "bg-[var(--primary)]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    payment: true, emi: true, credit: true, offers: false, products: false, app: true, login: true, card: true,
  });

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Notifications" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {notifGroups.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2 px-1">{group.title}</p>
            <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
              {group.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3.5">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{item.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{item.sub}</p>
                  </div>
                  <Toggle on={enabled[item.id]} onToggle={() => setEnabled((p) => ({ ...p, [item.id]: !p[item.id] }))} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
