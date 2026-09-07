import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";
import SuccessScreen from "@/components/common/SuccessScreen";

interface Props {
  title: string;
  description: string;
  amount: number;
  details: { label: string; value: string }[];
  onBack: () => void;
}

const paymentMethods = [
  { id: "wallet", label: "1Fi Wallet", sub: "Balance: ₹12,500", emoji: "💳" },
  { id: "upi", label: "UPI", sub: "rahul.mehta@1fi", emoji: "📲" },
  { id: "netbanking", label: "Net Banking", sub: "HDFC Bank", emoji: "🏦" },
];

export default function PayNowScreen({ title, description, amount, details, onBack }: Props) {
  const [method, setMethod] = useState("wallet");
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="flex flex-col h-full">
        <SuccessScreen
          title="Payment Successful!"
          subtitle={description}
          details={[
            ...details,
            { label: "Amount Paid", value: `₹${amount.toLocaleString()}` },
            { label: "Ref No.", value: "1FI" + Math.floor(Math.random() * 1e9) },
          ]}
          ctaLabel="Done"
          onCta={onBack}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title={title} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {/* Amount */}
        <div className="bg-[var(--primary)] rounded-2xl p-5 text-center">
          <p className="text-white/50 text-xs mb-1">{description}</p>
          <p className="text-white text-3xl font-black">₹{amount.toLocaleString()}</p>
        </div>

        {/* Details */}
        <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
          {details.map(({ label, value }) => (
            <div key={label} className="flex justify-between px-4 py-3 text-sm">
              <span className="text-[var(--muted-foreground)]">{label}</span>
              <span className="font-bold text-[var(--foreground)]">{value}</span>
            </div>
          ))}
        </div>

        {/* Payment method */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Pay via</p>
          <div className="space-y-2">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setMethod(pm.id)}
                className={`w-full flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 transition-all ${
                  method === pm.id ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] bg-white"
                }`}
              >
                <span className="text-2xl">{pm.emoji}</span>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-[var(--foreground)]">{pm.label}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{pm.sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${method === pm.id ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--border)]"}`}>
                  {method === pm.id && <span className="w-2 h-2 bg-[var(--primary)] rounded-full block" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-white border-t border-[var(--border)] flex-shrink-0">
        <button
          onClick={() => setPaid(true)}
          className="w-full bg-[var(--accent)] text-[var(--primary)] font-black py-4 rounded-2xl text-sm"
        >
          Pay ₹{amount.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
