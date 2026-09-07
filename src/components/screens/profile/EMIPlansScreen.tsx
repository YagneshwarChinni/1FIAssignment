import ScreenHeader from "@/components/common/ScreenHeader";
import { formatINR } from "@/data/products";

const plans = [
  {
    id: "e1",
    product: "iPhone 15 Pro",
    bank: "HDFC Bank",
    emoji: "📱",
    totalAmount: 140900,
    monthlyEmi: 23483,
    months: 6,
    paid: 1,
    nextDue: "Sep 10, 2026",
    status: "Active",
  },
];

export default function EMIPlansScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="EMI Plans" subtitle={`${plans.length} active plan`} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {plans.map((plan) => {
          const progress = plan.paid / plan.months;
          const remaining = plan.months - plan.paid;
          return (
            <div key={plan.id} className="bg-white border border-[var(--border)] rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--muted)] rounded-xl flex items-center justify-center text-2xl">{plan.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-bold text-[var(--foreground)]">{plan.product}</p>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{plan.status}</span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">{plan.bank}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="bg-[var(--muted)] rounded-xl py-2">
                  <p className="text-xs font-bold text-[var(--foreground)]">{formatINR(plan.monthlyEmi)}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Monthly</p>
                </div>
                <div className="bg-[var(--muted)] rounded-xl py-2">
                  <p className="text-xs font-bold text-[var(--foreground)]">{plan.paid}/{plan.months}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Paid</p>
                </div>
                <div className="bg-[var(--muted)] rounded-xl py-2">
                  <p className="text-xs font-bold text-[var(--foreground)]">{remaining}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Remaining</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-[11px] text-[var(--muted-foreground)] mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${progress * 100}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Next EMI due</p>
                  <p className="text-xs font-bold text-amber-600">{plan.nextDue}</p>
                </div>
                <button className="text-xs font-bold bg-[var(--primary)] text-white px-4 py-2 rounded-xl">
                  Pay Now
                </button>
              </div>
            </div>
          );
        })}

        {plans.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-5xl">🎉</span>
            <p className="text-sm font-semibold text-[var(--foreground)]">No active EMI plans</p>
          </div>
        )}
      </div>
    </div>
  );
}
