import { useState } from "react";
import { formatINR } from "@/data/products";

const monthlyData = [
  { month: "Apr", income: 82000, expense: 31000, categories: [
    { category: "Food & Dining", amount: 5200, budget: 5000, emoji: "🍔", color: "#4ADE80" },
    { category: "Shopping", amount: 12000, budget: 10000, emoji: "🛍️", color: "#0A0D1E" },
    { category: "Entertainment", amount: 1800, budget: 2000, emoji: "🎬", color: "#7c3aed" },
    { category: "Transport", amount: 1500, budget: 2000, emoji: "🚗", color: "#059669" },
    { category: "Groceries", amount: 4200, budget: 4000, emoji: "🛒", color: "#d97706" },
    { category: "Utilities", amount: 1300, budget: 1500, emoji: "💡", color: "#0891b2" },
  ]},
  { month: "May", income: 85000, expense: 28000, categories: [
    { category: "Food & Dining", amount: 3800, budget: 5000, emoji: "🍔", color: "#4ADE80" },
    { category: "Shopping", amount: 9500, budget: 10000, emoji: "🛍️", color: "#0A0D1E" },
    { category: "Entertainment", amount: 1200, budget: 2000, emoji: "🎬", color: "#7c3aed" },
    { category: "Transport", amount: 1100, budget: 2000, emoji: "🚗", color: "#059669" },
    { category: "Groceries", amount: 3600, budget: 4000, emoji: "🛒", color: "#d97706" },
    { category: "Utilities", amount: 890, budget: 1500, emoji: "💡", color: "#0891b2" },
  ]},
  { month: "Jun", income: 85000, expense: 35000, categories: [
    { category: "Food & Dining", amount: 6100, budget: 5000, emoji: "🍔", color: "#4ADE80" },
    { category: "Shopping", amount: 14000, budget: 10000, emoji: "🛍️", color: "#0A0D1E" },
    { category: "Entertainment", amount: 2100, budget: 2000, emoji: "🎬", color: "#7c3aed" },
    { category: "Transport", amount: 1800, budget: 2000, emoji: "🚗", color: "#059669" },
    { category: "Groceries", amount: 4800, budget: 4000, emoji: "🛒", color: "#d97706" },
    { category: "Utilities", amount: 1200, budget: 1500, emoji: "💡", color: "#0891b2" },
  ]},
  { month: "Jul", income: 85000, expense: 29000, categories: [
    { category: "Food & Dining", amount: 4400, budget: 5000, emoji: "🍔", color: "#4ADE80" },
    { category: "Shopping", amount: 9800, budget: 10000, emoji: "🛍️", color: "#0A0D1E" },
    { category: "Entertainment", amount: 980, budget: 2000, emoji: "🎬", color: "#7c3aed" },
    { category: "Transport", amount: 1200, budget: 2000, emoji: "🚗", color: "#059669" },
    { category: "Groceries", amount: 3200, budget: 4000, emoji: "🛒", color: "#d97706" },
    { category: "Utilities", amount: 890, budget: 1500, emoji: "💡", color: "#0891b2" },
  ]},
  { month: "Aug", income: 85000, expense: 33000, categories: [
    { category: "Food & Dining", amount: 5600, budget: 5000, emoji: "🍔", color: "#4ADE80" },
    { category: "Shopping", amount: 11200, budget: 10000, emoji: "🛍️", color: "#0A0D1E" },
    { category: "Entertainment", amount: 1500, budget: 2000, emoji: "🎬", color: "#7c3aed" },
    { category: "Transport", amount: 1600, budget: 2000, emoji: "🚗", color: "#059669" },
    { category: "Groceries", amount: 4100, budget: 4000, emoji: "🛒", color: "#d97706" },
    { category: "Utilities", amount: 1000, budget: 1500, emoji: "💡", color: "#0891b2" },
  ]},
  { month: "Sep", income: 85000, expense: 19388, categories: [
    { category: "Food & Dining", amount: 4210, budget: 5000, emoji: "🍔", color: "#4ADE80" },
    { category: "Shopping", amount: 8650, budget: 10000, emoji: "🛍️", color: "#0A0D1E" },
    { category: "Entertainment", amount: 1298, budget: 2000, emoji: "🎬", color: "#7c3aed" },
    { category: "Transport", amount: 1240, budget: 2000, emoji: "🚗", color: "#059669" },
    { category: "Groceries", amount: 3100, budget: 4000, emoji: "🛒", color: "#d97706" },
    { category: "Utilities", amount: 890, budget: 1500, emoji: "💡", color: "#0891b2" },
  ]},
];

const maxBar = Math.max(...monthlyData.map((d) => d.income));

export default function InsightsPage() {
  const [activeIdx, setActiveIdx] = useState(5);
  const data = monthlyData[activeIdx];
  const totalSpent = data.categories.reduce((s, c) => s + c.amount, 0);
  const totalBudget = data.categories.reduce((s, c) => s + c.budget, 0);

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <div className="bg-[var(--primary)] px-4 pt-10 pb-5 flex-shrink-0">
        <p className="text-white/50 text-xs font-medium mb-0.5">Spending Overview</p>
        <h1 className="text-white text-lg font-bold">Insights</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-6">
        {/* Month selector */}
        <div className="flex gap-1.5">
          {monthlyData.map((d, i) => (
            <button
              key={d.month}
              onClick={() => setActiveIdx(i)}
              className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all ${
                activeIdx === i
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white border border-[var(--border)] text-[var(--muted-foreground)]"
              }`}
            >
              {d.month}
            </button>
          ))}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--primary)] rounded-2xl p-4">
            <p className="text-white/50 text-[11px] mb-1">Income</p>
            <p className="text-[var(--accent)] text-lg font-black">{formatINR(data.income)}</p>
            <p className="text-white/40 text-[10px] mt-0.5">{data.month} 2026</p>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-2xl p-4">
            <p className="text-[var(--muted-foreground)] text-[11px] mb-1">Spent</p>
            <p className="text-[var(--foreground)] text-lg font-black">{formatINR(totalSpent)}</p>
            <p className="text-[var(--muted-foreground)] text-[10px] mt-0.5">of {formatINR(totalBudget)}</p>
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-4">
          <p className="text-sm font-bold text-[var(--foreground)] mb-4">Income vs Expenses</p>
          <div className="flex items-end gap-1.5 h-28">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end" style={{ height: "88px" }}>
                  <div className="flex-1 bg-[var(--muted)] rounded-t-md" style={{ height: `${(d.income / maxBar) * 88}px` }} />
                  <div
                    className="flex-1 rounded-t-md transition-all duration-300"
                    style={{
                      height: `${(d.expense / maxBar) * 88}px`,
                      backgroundColor: i === activeIdx ? "#4ADE80" : "#0A0D1E",
                      opacity: i === activeIdx ? 1 : 0.3,
                    }}
                  />
                </div>
                <span className={`text-[9px] font-bold ${i === activeIdx ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`}>
                  {d.month}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[var(--muted)]" />
              <span className="text-[10px] text-[var(--muted-foreground)]">Income</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[var(--primary)]/30" />
              <span className="text-[10px] text-[var(--muted-foreground)]">Expenses</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <p className="text-sm font-bold text-[var(--foreground)] mb-3">Spending by Category</p>
          <div className="space-y-2">
            {data.categories.map((cat) => {
              const pct = (cat.amount / cat.budget) * 100;
              const over = pct > 100;
              return (
                <div key={cat.category} className={`bg-white border rounded-2xl px-4 py-3 ${over ? "border-red-200" : "border-[var(--border)]"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{cat.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[var(--foreground)] truncate">{cat.category}</p>
                        <p className={`text-xs font-black ml-2 flex-shrink-0 ${over ? "text-red-500" : "text-[var(--foreground)]"}`}>
                          {formatINR(cat.amount)}
                        </p>
                      </div>
                      <p className="text-[10px] text-[var(--muted-foreground)]">
                        of {formatINR(cat.budget)} · {pct.toFixed(0)}%
                        {over && <span className="text-red-500 font-bold ml-1">Over!</span>}
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: over ? "#ef4444" : "#4ADE80" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-2" />
      </div>
    </div>
  );
}
