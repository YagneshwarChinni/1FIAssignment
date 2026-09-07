import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";
import SuccessScreen from "@/components/common/SuccessScreen";
import { formatINR } from "@/data/products";

const contacts = [
  { name: "Priya Sharma", upi: "priya@okaxis", initials: "PS", color: "bg-purple-100 text-purple-700" },
  { name: "Amit Kumar", upi: "amit.k@ybl", initials: "AK", color: "bg-blue-100 text-blue-700" },
  { name: "Sneha Reddy", upi: "sneha99@paytm", initials: "SR", color: "bg-green-100 text-green-700" },
  { name: "Rohit Jain", upi: "rohit.j@ibl", initials: "RJ", color: "bg-orange-100 text-orange-700" },
];

type Step = "contact" | "amount" | "success";

interface Props { onBack: () => void }

export default function SendMoneyScreen({ onBack }: Props) {
  const [step, setStep] = useState<Step>("contact");
  const [selected, setSelected] = useState<typeof contacts[0] | null>(null);
  const [upiInput, setUpiInput] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  if (step === "success") {
    return (
      <div className="flex flex-col h-full">
        <SuccessScreen
          title="Money Sent!"
          subtitle={`₹${amount} sent to ${selected?.name ?? upiInput}`}
          details={[
            { label: "To", value: selected?.name ?? upiInput },
            { label: "UPI ID", value: selected?.upi ?? upiInput },
            { label: "Amount", value: formatINR(Number(amount)) },
            { label: "Ref No.", value: "1FI" + Math.floor(Math.random() * 1e9) },
            ...(note ? [{ label: "Note", value: note }] : []),
          ]}
          ctaLabel="Back to Home"
          onCta={onBack}
        />
      </div>
    );
  }

  if (step === "amount" && selected) {
    return (
      <div className="flex flex-col h-full bg-[var(--background)]">
        <ScreenHeader title="Send Money" subtitle={`To ${selected.name}`} onBack={() => setStep("contact")} />
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${selected.color}`}>
              {selected.initials}
            </div>
            <p className="font-semibold text-[var(--foreground)]">{selected.name}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{selected.upi}</p>
          </div>

          <div className="bg-white border border-[var(--border)] rounded-2xl p-5 text-center">
            <p className="text-xs text-[var(--muted-foreground)] mb-2">Enter Amount</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-[var(--foreground)]">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="text-4xl font-bold text-[var(--foreground)] bg-transparent outline-none w-40 text-center"
                autoFocus
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--muted-foreground)] mb-2">Quick amounts</p>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(String(q))}
                  className="px-4 py-2 bg-white border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)]/40"
                >
                  ₹{q.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--muted-foreground)] mb-2">Add a note (optional)</p>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Dinner, Rent..."
              className="w-full bg-white border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>
        <div className="px-4 py-3 bg-white border-t border-[var(--border)]">
          <button
            disabled={!amount || Number(amount) <= 0}
            onClick={() => setStep("success")}
            className="w-full bg-[var(--accent)] text-[var(--primary)] font-black py-3.5 rounded-2xl text-sm disabled:opacity-40"
          >
            Send {amount ? formatINR(Number(amount)) : ""}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Send Money" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-2">Enter UPI ID or mobile number</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={upiInput}
              onChange={(e) => setUpiInput(e.target.value)}
              placeholder="name@bank or 9XXXXXXXXX"
              className="flex-1 bg-white border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
            />
            <button
              disabled={!upiInput}
              onClick={() => {
                setSelected({ name: upiInput, upi: upiInput, initials: upiInput[0].toUpperCase(), color: "bg-gray-100 text-gray-700" });
                setStep("amount");
              }}
              className="bg-[var(--primary)] text-white font-semibold px-4 rounded-xl text-sm disabled:opacity-40"
            >
              Pay
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Recent Contacts</p>
          <div className="space-y-2">
            {contacts.map((c) => (
              <button
                key={c.upi}
                onClick={() => { setSelected(c); setStep("amount"); }}
                className="w-full flex items-center gap-3 bg-white border border-[var(--border)] rounded-2xl px-4 py-3.5 hover:border-[var(--primary)]/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${c.color}`}>
                  {c.initials}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{c.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{c.upi}</p>
                </div>
                <span className="text-xs font-semibold text-[var(--primary)]">Pay</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
