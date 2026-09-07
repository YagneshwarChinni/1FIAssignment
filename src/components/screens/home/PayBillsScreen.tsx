import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";
import SuccessScreen from "@/components/common/SuccessScreen";

type Step = "categories" | "form" | "confirm" | "success";

const categories = [
  { id: "electricity", emoji: "⚡", label: "Electricity", provider: "BESCOM", accountLabel: "Consumer No.", placeholder: "Enter consumer number" },
  { id: "water", emoji: "💧", label: "Water", provider: "BWSSB", accountLabel: "Account No.", placeholder: "Enter account number" },
  { id: "gas", emoji: "🔥", label: "Gas", provider: "Indane LPG", accountLabel: "Customer ID", placeholder: "Enter customer ID" },
  { id: "broadband", emoji: "🌐", label: "Broadband", provider: "Airtel Xstream", accountLabel: "Account No.", placeholder: "Enter account number" },
  { id: "dth", emoji: "📺", label: "DTH", provider: "Tata Play", accountLabel: "Subscriber ID", placeholder: "Enter subscriber ID" },
  { id: "insurance", emoji: "🛡️", label: "Insurance", provider: "LIC", accountLabel: "Policy No.", placeholder: "Enter policy number" },
];

export default function PayBillsScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>("categories");
  const [selected, setSelected] = useState<typeof categories[0] | null>(null);
  const [account, setAccount] = useState("");
  const [amount] = useState("1,248");

  if (step === "success" && selected) {
    return (
      <div className="flex flex-col h-full">
        <SuccessScreen
          title="Bill Paid!"
          subtitle={`${selected.label} bill paid successfully`}
          details={[
            { label: "Biller", value: selected.provider },
            { label: "Account", value: account },
            { label: "Amount Paid", value: `₹${amount}` },
            { label: "Date", value: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) },
            { label: "Ref No.", value: "1FI" + Math.floor(Math.random() * 1e9) },
          ]}
          ctaLabel="Back to Home"
          onCta={onBack}
        />
      </div>
    );
  }

  if (step === "confirm" && selected) {
    return (
      <div className="flex flex-col h-full bg-[var(--background)]">
        <ScreenHeader title="Confirm Payment" onBack={() => setStep("form")} />
        <div className="flex-1 px-4 py-6 space-y-4">
          <div className="flex flex-col items-center gap-2 py-4">
            <span className="text-5xl">{selected.emoji}</span>
            <p className="font-bold text-[var(--foreground)]">{selected.provider}</p>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
            {[
              { label: selected.accountLabel, value: account },
              { label: "Bill Amount", value: `₹${amount}` },
              { label: "Due Date", value: "Sep 15, 2026" },
              { label: "Payment from", value: "1Fi Wallet" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between px-4 py-3 text-sm">
                <span className="text-[var(--muted-foreground)]">{label}</span>
                <span className="font-semibold text-[var(--foreground)]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-3 bg-white border-t border-[var(--border)]">
          <button
            onClick={() => setStep("success")}
            className="w-full bg-[var(--accent)] text-[var(--primary)] font-black py-3.5 rounded-2xl text-sm"
          >
            Pay ₹{amount}
          </button>
        </div>
      </div>
    );
  }

  if (step === "form" && selected) {
    return (
      <div className="flex flex-col h-full bg-[var(--background)]">
        <ScreenHeader title={selected.label} subtitle={selected.provider} onBack={() => setStep("categories")} />
        <div className="flex-1 px-4 py-6 space-y-5">
          <div className="flex justify-center py-4">
            <span className="text-6xl">{selected.emoji}</span>
          </div>
          <div>
            <p className="text-xs text-[var(--muted-foreground)] mb-2">{selected.accountLabel}</p>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder={selected.placeholder}
              className="w-full bg-white border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
            />
          </div>
          {account && (
            <div className="bg-[var(--secondary)] border border-[var(--primary)]/20 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">Bill Amount Due</p>
                  <p className="text-xl font-bold text-[var(--foreground)]">₹{amount}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Due: Sep 15, 2026</p>
                </div>
                <span className="text-3xl">{selected.emoji}</span>
              </div>
            </div>
          )}
        </div>
        <div className="px-4 py-3 bg-white border-t border-[var(--border)]">
          <button
            disabled={!account}
            onClick={() => setStep("confirm")}
            className="w-full bg-[var(--accent)] text-[var(--primary)] font-black py-3.5 rounded-2xl text-sm disabled:opacity-40"
          >
            Fetch Bill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Pay Bills" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-xs text-[var(--muted-foreground)] mb-3">Select a bill category</p>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelected(cat); setStep("form"); }}
              className="flex flex-col items-center gap-2 bg-white border border-[var(--border)] rounded-2xl py-5 hover:border-[var(--primary)]/40 transition-colors active:scale-95"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-[var(--foreground)]">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
