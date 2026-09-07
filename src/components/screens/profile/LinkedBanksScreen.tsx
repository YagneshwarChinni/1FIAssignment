import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

const banks = [
  { id: "hdfc", name: "HDFC Bank", account: "XXXX XXXX 3842", ifsc: "HDFC0001234", type: "Savings", primary: true, color: "bg-red-100" },
  { id: "sbi", name: "State Bank of India", account: "XXXX XXXX 9201", ifsc: "SBIN0001234", type: "Savings", primary: false, color: "bg-blue-100" },
];

export default function LinkedBanksScreen({ onBack }: { onBack: () => void }) {
  const [primaryId, setPrimaryId] = useState("hdfc");

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Linked Bank Accounts" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {banks.map((bank) => (
          <div key={bank.id} className={`bg-white border-2 rounded-2xl p-4 ${primaryId === bank.id ? "border-[var(--primary)]" : "border-[var(--border)]"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${bank.color} flex items-center justify-center text-lg`}>🏦</div>
              {primaryId === bank.id && (
                <span className="text-[10px] font-bold bg-[var(--primary)] text-white px-2 py-0.5 rounded-full">Primary</span>
              )}
            </div>
            <p className="text-sm font-bold text-[var(--foreground)] mb-0.5">{bank.name}</p>
            <p className="text-xs text-[var(--muted-foreground)] mb-0.5">{bank.account}</p>
            <p className="text-xs text-[var(--muted-foreground)]">IFSC: {bank.ifsc} · {bank.type}</p>
            {primaryId !== bank.id && (
              <button
                onClick={() => setPrimaryId(bank.id)}
                className="mt-3 text-xs font-bold text-[var(--primary)] border border-[var(--primary)] px-3 py-1.5 rounded-xl"
              >
                Set as Primary
              </button>
            )}
          </div>
        ))}
        <button className="w-full flex items-center justify-center gap-2 bg-[var(--secondary)] border border-dashed border-[var(--primary)]/40 rounded-2xl py-4 text-sm font-semibold text-[var(--primary)]">
          <span className="text-xl">➕</span> Add New Bank Account
        </button>
      </div>
    </div>
  );
}
