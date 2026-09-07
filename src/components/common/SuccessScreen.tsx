interface SuccessScreenProps {
  title: string;
  subtitle: string;
  details?: { label: string; value: string }[];
  ctaLabel?: string;
  onCta: () => void;
}

export default function SuccessScreen({
  title, subtitle, details = [], ctaLabel = "Done", onCta,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-6 bg-[var(--background)]">
      <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center">
        <span className="text-3xl">✓</span>
      </div>
      <div>
        <h2 className="text-xl font-black text-[var(--foreground)] mb-1">{title}</h2>
        <p className="text-sm text-[var(--muted-foreground)]">{subtitle}</p>
      </div>
      {details.length > 0 && (
        <div className="bg-white border border-[var(--border)] rounded-2xl w-full p-4 text-left space-y-3">
          {details.map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">{label}</span>
              <span className="font-bold text-[var(--foreground)]">{value}</span>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={onCta}
        className="w-full bg-[var(--accent)] text-[var(--primary)] font-black py-4 rounded-2xl text-sm"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
