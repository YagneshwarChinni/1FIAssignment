import ScreenHeader from "@/components/common/ScreenHeader";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By using 1Fi, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of the app immediately.",
  },
  {
    title: "2. Eligibility",
    content: "You must be at least 18 years of age and a resident of India to use 1Fi services. KYC verification is mandatory for all financial transactions.",
  },
  {
    title: "3. Account Security",
    content: "You are responsible for maintaining the confidentiality of your account credentials. 1Fi will never ask for your PIN or OTP. Report any suspicious activity immediately.",
  },
  {
    title: "4. Payments & Transactions",
    content: "All transactions are final unless disputed within 7 days. EMI plans are subject to credit approval. Processing fees are non-refundable.",
  },
  {
    title: "5. Privacy Policy",
    content: "We collect and process your data in accordance with our Privacy Policy. Your data is never sold to third parties. You may request data deletion at any time.",
  },
  {
    title: "6. Governing Law",
    content: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.",
  },
];

export default function TermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Terms & Conditions" subtitle="Last updated: Sep 1, 2026" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {sections.map((s) => (
          <div key={s.title} className="bg-white border border-[var(--border)] rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[var(--foreground)] mb-2">{s.title}</p>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{s.content}</p>
          </div>
        ))}
        <div className="h-4" />
      </div>
    </div>
  );
}
