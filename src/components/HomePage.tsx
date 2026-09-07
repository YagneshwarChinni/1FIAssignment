import { useState } from "react";
import { formatINR } from "@/data/products";
import SendMoneyScreen from "@/components/screens/home/SendMoneyScreen";
import ReceiveMoneyScreen from "@/components/screens/home/ReceiveMoneyScreen";
import RechargeScreen from "@/components/screens/home/RechargeScreen";
import PayBillsScreen from "@/components/screens/home/PayBillsScreen";
import AllTransactionsScreen from "@/components/screens/home/AllTransactionsScreen";
import PayNowScreen from "@/components/screens/PayNowScreen";

type Screen = "home" | "send" | "receive" | "recharge" | "paybills" | "alltx" | "paynow";

const transactions = [
  { id: 1, name: "Swiggy", category: "Food", amount: -349, date: "Today, 1:20 PM", emoji: "🍔" },
  { id: 2, name: "Salary Credit", category: "Income", amount: 85000, date: "Today, 9:00 AM", emoji: "💰" },
  { id: 3, name: "Amazon Pay", category: "Shopping", amount: -2199, date: "Yesterday", emoji: "📦" },
  { id: 4, name: "Zepto", category: "Groceries", amount: -678, date: "Yesterday", emoji: "🛒" },
  { id: 5, name: "Netflix", category: "Entertainment", amount: -649, date: "Sep 5", emoji: "🎬" },
];

const quickActions: { emoji: string; label: string; screen: Screen }[] = [
  { emoji: "💸", label: "Send", screen: "send" },
  { emoji: "📲", label: "Receive", screen: "receive" },
  { emoji: "🔁", label: "Recharge", screen: "recharge" },
  { emoji: "⚡", label: "Pay Bills", screen: "paybills" },
];

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("home");

  if (screen === "send") return <SendMoneyScreen onBack={() => setScreen("home")} />;
  if (screen === "receive") return <ReceiveMoneyScreen onBack={() => setScreen("home")} />;
  if (screen === "recharge") return <RechargeScreen onBack={() => setScreen("home")} />;
  if (screen === "paybills") return <PayBillsScreen onBack={() => setScreen("home")} />;
  if (screen === "alltx") return <AllTransactionsScreen onBack={() => setScreen("home")} />;
  if (screen === "paynow") return (
    <PayNowScreen
      title="Pay EMI"
      description="iPhone 15 Pro · HDFC Bank · 6-month plan"
      amount={23483}
      details={[
        { label: "Product", value: "iPhone 15 Pro" },
        { label: "Bank", value: "HDFC Bank" },
        { label: "Plan", value: "6 months" },
        { label: "Due Date", value: "Sep 10, 2026" },
      ]}
      onBack={() => setScreen("home")}
    />
  );

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* 1Fi Header — dark navy */}
      <div className="bg-[var(--primary)] px-4 pt-10 pb-5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs font-medium mb-0.5">Good morning 👋</p>
            <h1 className="text-white text-lg font-bold">Rahul Mehta</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-lg font-bold text-[var(--primary)]">
            R
          </div>
        </div>

        {/* Balance card inside header */}
        <div className="mt-4 bg-white/8 border border-white/10 rounded-2xl p-4">
          <p className="text-white/50 text-xs mb-1">Total Balance</p>
          <p className="text-white text-3xl font-bold tracking-tight">₹1,24,580</p>
          <div className="flex gap-5 mt-3 text-xs">
            <div>
              <p className="text-white/40">Income</p>
              <p className="text-[var(--accent)] font-semibold">+₹85,000</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-white/40">Spent</p>
              <p className="text-red-400 font-semibold">-₹4,395</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-white/40">Savings</p>
              <p className="text-blue-300 font-semibold">₹12,500</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map(({ emoji, label, screen: s }) => (
            <button
              key={label}
              onClick={() => setScreen(s)}
              className="flex flex-col items-center gap-2 bg-white border border-[var(--border)] rounded-2xl py-3.5 active:scale-95 transition-all hover:border-[var(--primary)]/20 hover:shadow-sm"
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-[11px] font-semibold text-[var(--foreground)]">{label}</span>
            </button>
          ))}
        </div>

        {/* EMI due banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-0.5">EMI Due Soon</p>
              <p className="text-sm font-bold text-[var(--foreground)]">iPhone 15 Pro</p>
              <p className="text-xs text-[var(--muted-foreground)]">Due Sep 10, 2026 · HDFC Bank</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-[var(--foreground)]">₹23,483</p>
              <button
                onClick={() => setScreen("paynow")}
                className="mt-1.5 text-xs font-bold bg-[var(--primary)] text-white px-3 py-1.5 rounded-xl"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        {/* Recent transactions */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-sm font-bold text-[var(--foreground)]">Recent Transactions</p>
            <button onClick={() => setScreen("alltx")} className="text-xs font-semibold text-[var(--primary)]">
              See all
            </button>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 bg-[var(--muted)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {tx.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--foreground)] truncate">{tx.name}</p>
                  <p className="text-[11px] text-[var(--muted-foreground)]">{tx.date}</p>
                </div>
                <span className={`text-sm font-bold flex-shrink-0 ${tx.amount > 0 ? "text-green-600" : "text-[var(--foreground)]"}`}>
                  {tx.amount > 0 ? "+" : ""}{formatINR(Math.abs(tx.amount))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}
