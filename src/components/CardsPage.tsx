import { useState } from "react";
import { formatINR } from "@/data/products";
import PayNowScreen from "@/components/screens/PayNowScreen";

type Screen = "cards" | "paynow";

const cards = [
  {
    id: "1fi-black",
    name: "1Fi Black Card",
    number: "**** **** **** 4821",
    type: "Visa",
    limit: 200000,
    used: 47520,
    dueDate: "Sep 15, 2026",
    dueAmount: 47520,
    gradient: "from-[#0A0D1E] to-[#1a2350]",
    transactions: [
      { name: "Apple Store", amount: 12999, date: "Sep 6", emoji: "🍎" },
      { name: "Uber", amount: 320, date: "Sep 5", emoji: "🚗" },
      { name: "Zomato", amount: 850, date: "Sep 4", emoji: "🍕" },
      { name: "BookMyShow", amount: 798, date: "Sep 3", emoji: "🎬" },
    ],
  },
  {
    id: "1fi-green",
    name: "1Fi Rewards Card",
    number: "**** **** **** 7734",
    type: "Mastercard",
    limit: 100000,
    used: 12340,
    dueDate: "Sep 20, 2026",
    dueAmount: 12340,
    gradient: "from-[#0A0D1E] to-[#1a3020]",
    transactions: [
      { name: "Swiggy", amount: 490, date: "Sep 6", emoji: "🍔" },
      { name: "Amazon", amount: 3499, date: "Sep 4", emoji: "📦" },
      { name: "Myntra", amount: 2199, date: "Sep 2", emoji: "👗" },
    ],
  },
];

export default function CardsPage() {
  const [screen, setScreen] = useState<Screen>("cards");
  const [activeCard, setActiveCard] = useState(0);
  const card = cards[activeCard];

  if (screen === "paynow") {
    return (
      <PayNowScreen
        title="Pay Card Bill"
        description={`${card.name} · Due ${card.dueDate}`}
        amount={card.dueAmount}
        details={[
          { label: "Card", value: card.name },
          { label: "Card Number", value: card.number },
          { label: "Due Date", value: card.dueDate },
          { label: "Min. Due", value: formatINR(Math.round(card.dueAmount * 0.05)) },
        ]}
        onBack={() => setScreen("cards")}
      />
    );
  }

  const available = card.limit - card.used;
  const usedPct = (card.used / card.limit) * 100;

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <div className="bg-[var(--primary)] px-4 pt-10 pb-5 flex-shrink-0">
        <p className="text-white/50 text-xs font-medium mb-0.5">My Cards</p>
        <h1 className="text-white text-lg font-bold">Credit Cards</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Card selector */}
        <div className="px-4 -mt-2 mb-4 space-y-3">
          {cards.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveCard(i)}
              className={`w-full rounded-3xl bg-gradient-to-br ${c.gradient} p-5 text-left transition-all duration-200 border ${
                activeCard === i ? "border-[var(--accent)]/40 shadow-xl shadow-black/30 scale-100" : "border-white/5 opacity-70 scale-[0.98]"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 bg-[var(--accent)] rounded-md flex items-center justify-center">
                      <span className="text-[var(--primary)] text-[7px] font-black">1Fi</span>
                    </div>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Bank</p>
                  </div>
                  <p className="text-sm font-bold text-white">{c.name}</p>
                </div>
                <div className="text-[10px] font-bold px-2.5 py-1 bg-white/10 rounded-lg text-white/80">{c.type}</div>
              </div>
              <p className="text-sm font-mono tracking-[0.2em] text-white/80 mb-4">{c.number}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-white/40">Available</p>
                  <p className="text-lg font-black text-white">{formatINR(available)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40">Limit</p>
                  <p className="text-sm font-bold text-white/70">{formatINR(c.limit)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="px-4 space-y-3 pb-6">
          {/* Utilisation */}
          <div className="bg-white border border-[var(--border)] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-bold text-[var(--foreground)]">Credit Utilisation</p>
              <p className="text-xs font-black text-[var(--primary)]">{usedPct.toFixed(0)}%</p>
            </div>
            <div className="h-2.5 bg-[var(--muted)] rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${usedPct > 70 ? "bg-red-400" : "bg-[var(--accent)]"}`}
                style={{ width: `${usedPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[var(--muted-foreground)]">
              <span>Used: {formatINR(card.used)}</span>
              <span>Limit: {formatINR(card.limit)}</span>
            </div>
          </div>

          {/* Due amount */}
          <div className="bg-[var(--primary)] rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white/50 text-[10px] mb-0.5">Amount Due</p>
              <p className="text-xl font-black text-white">{formatINR(card.dueAmount)}</p>
              <p className="text-white/50 text-[11px] mt-0.5">Due by {card.dueDate}</p>
            </div>
            <button
              onClick={() => setScreen("paynow")}
              className="bg-[var(--accent)] text-[var(--primary)] text-xs font-black px-4 py-2.5 rounded-xl"
            >
              Pay Now
            </button>
          </div>

          {/* Transactions */}
          <div>
            <p className="text-sm font-bold text-[var(--foreground)] mb-2">Recent Transactions</p>
            <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
              {card.transactions.map((tx, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 bg-[var(--muted)] rounded-xl flex items-center justify-center text-lg">{tx.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{tx.name}</p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">{tx.date}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--foreground)]">-{formatINR(tx.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
