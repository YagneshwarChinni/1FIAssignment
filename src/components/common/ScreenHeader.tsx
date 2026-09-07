import { ArrowLeft } from "@/components/Icons";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  right?: React.ReactNode;
}

export default function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  return (
    <div className="bg-[var(--primary)] text-white px-4 pt-10 pb-5 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 active:bg-white/20 transition-colors"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold truncate text-white">{title}</h1>
          {subtitle && <p className="text-[11px] text-white/50 mt-0.5">{subtitle}</p>}
        </div>
        {right && <div className="flex-shrink-0">{right}</div>}
      </div>
    </div>
  );
}
