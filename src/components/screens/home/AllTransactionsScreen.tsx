import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";
import { formatINR } from "@/data/products";

const ALL_TRANSACTIONS = [
  { id: 1, name: "Swiggy", category: "Food", amount: -349, date: "Sep 7, 2026", time: "1:20 PM", emoji: "🍔" },
  { id: 2, name: "Salary Credit", category: "Income", amount: 85000, date: "Sep 7, 2026", time: "9:00 AM", emoji: "💰" },
  { id: 3, name: "Amazon Pay", category: "Shopping", amount: -2199, date: "Sep 6, 2026", time: "4:15 PM", emoji: "📦" },
  { id: 4, name: "Zepto", category: "Groceries", amount: -678, date: "Sep 6, 2026", time: "11:30 AM", emoji: "🛒" },
  { id: 5, name: "Netflix", category: "Entertainment", amount: -649, date: "Sep 5, 2026", time: "12:00 AM", emoji: "🎬" },
  { id: 6, name: "Zomato", category: "Food", amount: -520, date: "Sep 4, 2026", time: "8:45 PM", emoji: "🍕" },
  { id: 7, name: "Uber", category: "Transport", amount: -320, date: "Sep 4, 2026", time: "3:10 PM", emoji: "🚗" },
  { id: 8, name: "Myntra", category: "Shopping", amount: -1299, date: "Sep 3, 2026", time: "7:20 PM", emoji: "👗" },
  { id: 9, name: "BookMyShow", category: "Entertainment", amount: -798, date: "Sep 3, 2026", time: "2:00 PM", emoji: "🎬" },
  { id: 10, name: "BESCOM Bill", category: "Utilities", amount: -890, date: "Sep 2, 2026", time: "10:00 AM", emoji: "⚡" },
  { id: 11, name: "Jio Recharge", category: "Utilities", amount: -299, date: "Sep 1, 2026", time: "9:00 AM", emoji: "📱" },
  { id: 12, name: "Freelance Payment", category: "Income", amount: 15000, date: "Aug 31, 2026", time: "6:00 PM", emoji: "💰" },
];

const FILTERS = ["All", "Income", "Food", "Shopping", "Transport", "Entertainment", "Utilities", "Groceries"];

export default function AllTransactionsScreen({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState("All");

  const filtered = ALL_TRANSACTIONS.filter((t) => filter === "All" || t.category === filter);

  const grouped = filtered.reduce<Record<string, typeof ALL_TRANSACTIONS>>((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="All Transactions" subtitle={`${filtered.length} transactions`} onBack={onBack} />
      <div className="px-4 py-3 bg-white border-b border-[var(--border)]">
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${filter === f ? "bg-[var(--primary)] text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {Object.entries(grouped).map(([date, txs]) => (
          <div key={date} className="mb-4">
            <p className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">{date}</p>
            <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
              {txs.map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 bg-[var(--muted)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    {tx.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)] truncate">{tx.name}</p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">{tx.category} · {tx.time}</p>
                  </div>
                  <span className={`text-sm font-bold flex-shrink-0 ${tx.amount > 0 ? "text-green-600" : "text-[var(--foreground)]"}`}>
                    {tx.amount > 0 ? "+" : ""}{formatINR(Math.abs(tx.amount))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
