import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

const faqs = [
  { q: "How do I increase my credit limit?", a: "Credit limit increases are based on your credit score and repayment history. Use 1Fi regularly and pay on time to become eligible." },
  { q: "How long does money transfer take?", a: "UPI transfers are instant (24×7). NEFT transfers take 30 minutes during banking hours." },
  { q: "How do I dispute a transaction?", a: "Go to the transaction, tap 'Report an Issue', and our team will resolve it within 48 hours." },
  { q: "Is my money safe with 1Fi?", a: "Yes. 1Fi is RBI-regulated and your deposits are insured up to ₹5 lakhs under DICGC." },
];

export default function HelpSupportScreen({ onBack }: { onBack: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Help & Support" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: "💬", label: "Live Chat", sub: "Avg. 2 min" },
            { emoji: "📞", label: "Call Us", sub: "1800-123-1Fi" },
            { emoji: "✉️", label: "Email", sub: "help@1fi.in" },
          ].map(({ emoji, label, sub }) => (
            <button key={label} className="flex flex-col items-center gap-1.5 bg-white border border-[var(--border)] rounded-2xl py-4 hover:border-[var(--primary)]/40 transition-colors">
              <span className="text-2xl">{emoji}</span>
              <p className="text-xs font-bold text-[var(--foreground)]">{label}</p>
              <p className="text-[10px] text-[var(--muted-foreground)]">{sub}</p>
            </button>
          ))}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 px-1">Frequently Asked Questions</p>
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)] flex-1 pr-3">{faq.q}</p>
                  <span className={`text-[var(--primary)] text-lg font-light transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
