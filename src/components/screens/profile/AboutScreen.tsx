import ScreenHeader from "@/components/common/ScreenHeader";

export default function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="About 1Fi" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <div className="flex flex-col items-center py-6 gap-3">
          <div className="w-20 h-20 bg-[var(--primary)] rounded-3xl flex items-center justify-center">
            <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>1Fi</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-[var(--foreground)]">1Fi</p>
            <p className="text-xs text-[var(--muted-foreground)]">Version 3.4.1 (Build 2026.09.07)</p>
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
          {[
            { label: "App Version", value: "3.4.1" },
            { label: "Build Number", value: "2026.09.07" },
            { label: "Platform", value: "React Native" },
            { label: "Region", value: "India" },
            { label: "Regulated by", value: "Reserve Bank of India" },
            { label: "NBFC License", value: "N-14.03.02461" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between px-4 py-3 text-sm">
              <span className="text-[var(--muted-foreground)]">{label}</span>
              <span className="font-semibold text-[var(--foreground)]">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-[var(--secondary)] rounded-2xl px-4 py-4 text-center">
          <p className="text-xs text-[var(--muted-foreground)]">© 2026 1Fi Financial Technologies Pvt. Ltd.</p>
          <p className="text-xs text-[var(--muted-foreground)]">All rights reserved.</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">CIN: U65990KA2021PTC152890</p>
        </div>

        <div className="flex gap-3">
          {["Privacy Policy", "Terms of Use"].map((label) => (
            <button key={label} className="flex-1 bg-white border border-[var(--border)] rounded-xl py-3 text-xs font-semibold text-[var(--primary)]">
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
