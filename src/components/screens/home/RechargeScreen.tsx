import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";
import SuccessScreen from "@/components/common/SuccessScreen";

type Step = "form" | "plans" | "confirm" | "success";

const operators = ["Jio", "Airtel", "Vi", "BSNL"];
const plans = [
  { id: "p1", price: 179, validity: "28 days", data: "2GB/day", calls: "Unlimited", sms: "100/day", tag: "Popular" },
  { id: "p2", price: 299, validity: "28 days", data: "3GB/day", calls: "Unlimited", sms: "100/day", tag: "" },
  { id: "p3", price: 479, validity: "56 days", data: "2GB/day", calls: "Unlimited", sms: "100/day", tag: "Best Value" },
  { id: "p4", price: 999, validity: "84 days", data: "2GB/day", calls: "Unlimited", sms: "100/day", tag: "" },
];

export default function RechargeScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState("Jio");
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  if (step === "success" && selectedPlan) {
    return (
      <div className="flex flex-col h-full">
        <SuccessScreen
          title="Recharge Successful!"
          subtitle={`₹${selectedPlan.price} recharge for ${phone}`}
          details={[
            { label: "Mobile", value: phone },
            { label: "Operator", value: operator },
            { label: "Plan", value: `₹${selectedPlan.price} – ${selectedPlan.validity}` },
            { label: "Data", value: selectedPlan.data },
            { label: "Ref No.", value: "1FI" + Math.floor(Math.random() * 1e9) },
          ]}
          ctaLabel="Back to Home"
          onCta={onBack}
        />
      </div>
    );
  }

  if (step === "confirm" && selectedPlan) {
    return (
      <div className="flex flex-col h-full bg-[var(--background)]">
        <ScreenHeader title="Confirm Recharge" onBack={() => setStep("plans")} />
        <div className="flex-1 px-4 py-6 space-y-4">
          <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
            {[
              { label: "Mobile Number", value: phone },
              { label: "Operator", value: operator },
              { label: "Amount", value: `₹${selectedPlan.price}` },
              { label: "Validity", value: selectedPlan.validity },
              { label: "Data", value: selectedPlan.data },
              { label: "Calls", value: selectedPlan.calls },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between px-4 py-3 text-sm">
                <span className="text-[var(--muted-foreground)]">{label}</span>
                <span className="font-semibold text-[var(--foreground)]">{value}</span>
              </div>
            ))}
          </div>
          <div className="bg-[var(--secondary)] rounded-2xl px-4 py-3 text-xs text-[var(--muted-foreground)]">
            Payment will be deducted from your 1Fi wallet balance.
          </div>
        </div>
        <div className="px-4 py-3 bg-white border-t border-[var(--border)]">
          <button
            onClick={() => setStep("success")}
            className="w-full bg-[var(--accent)] text-[var(--primary)] font-black py-3.5 rounded-2xl text-sm"
          >
            Confirm & Recharge ₹{selectedPlan.price}
          </button>
        </div>
      </div>
    );
  }

  if (step === "plans") {
    return (
      <div className="flex flex-col h-full bg-[var(--background)]">
        <ScreenHeader title="Choose a Plan" subtitle={`${operator} · ${phone}`} onBack={() => setStep("form")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => { setSelectedPlan(plan); setStep("confirm"); }}
              className="w-full text-left bg-white border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--primary)]/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[var(--foreground)]">₹{plan.price}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">{plan.validity}</span>
                </div>
                {plan.tag && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${plan.tag === "Popular" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    {plan.tag}
                  </span>
                )}
              </div>
              <div className="flex gap-4 text-xs text-[var(--muted-foreground)]">
                <span>📶 {plan.data}</span>
                <span>📞 {plan.calls}</span>
                <span>💬 {plan.sms}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Mobile Recharge" onBack={onBack} />
      <div className="flex-1 px-4 py-6 space-y-5">
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-2">Mobile Number</p>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.slice(0, 10))}
            placeholder="Enter 10-digit number"
            className="w-full bg-white border border-[var(--border)] rounded-xl px-4 py-3 text-base font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)] tracking-widest"
          />
        </div>
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-2">Operator</p>
          <div className="grid grid-cols-2 gap-2">
            {operators.map((op) => (
              <button
                key={op}
                onClick={() => setOperator(op)}
                className={`py-3 rounded-xl text-sm font-semibold border transition-all ${operator === op ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white border-[var(--border)] text-[var(--foreground)]"}`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-white border-t border-[var(--border)]">
        <button
          disabled={phone.length < 10}
          onClick={() => setStep("plans")}
          className="w-full bg-[var(--accent)] text-[var(--primary)] font-black py-3.5 rounded-2xl text-sm disabled:opacity-40"
        >
          View Plans
        </button>
      </div>
    </div>
  );
}
