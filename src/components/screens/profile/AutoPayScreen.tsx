import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${on ? "bg-[var(--primary)]" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

const autopayItems = [
  { id: "emi", emoji: "📱", label: "EMI Payments", sub: "iPhone 15 Pro · Sep 10", bank: "HDFC Bank", amount: "₹23,483/mo", on: true },
  { id: "card", emoji: "💳", label: "Card Bill — Black", sub: "1Fi Black Card · Sep 15", bank: "HDFC Bank", amount: "₹47,520", on: false },
  { id: "card2", emoji: "💳", label: "Card Bill — Rewards", sub: "1Fi Rewards Card · Sep 20", bank: "SBI", amount: "₹12,340", on: true },
];

export default function AutoPayScreen({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState(autopayItems);

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="AutoPay Settings" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <div className="bg-[var(--secondary)] border border-[var(--primary)]/20 rounded-2xl px-4 py-3">
          <p className="text-xs text-[var(--primary)] font-semibold mb-1">💡 About AutoPay</p>
          <p className="text-xs text-[var(--muted-foreground)]">Enable AutoPay to automatically deduct EMI and bill payments on their due dates. Never miss a payment.</p>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className={`bg-white border-2 rounded-2xl p-4 ${item.on ? "border-[var(--primary)]/30" : "border-[var(--border)]"}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[var(--muted)] rounded-xl flex items-center justify-center text-xl">{item.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-[var(--foreground)]">{item.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{item.sub}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.bank} · {item.amount}</p>
                    </div>
                    <Toggle
                      on={item.on}
                      onToggle={() => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, on: !i.on } : i))}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
