import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

const UPI_ID = "rahul.mehta@1fi";

export default function ReceiveMoneyScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Receive Money" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center gap-6">
        <div className="bg-white border border-[var(--border)] rounded-3xl p-6 w-full flex flex-col items-center gap-5">
          <div>
            <p className="text-center text-xs text-[var(--muted-foreground)] mb-1">Scan to pay</p>
            <p className="text-center text-sm font-bold text-[var(--foreground)]">Rahul Mehta</p>
          </div>

          {/* SVG QR code placeholder */}
          <div className="w-52 h-52 border-2 border-[var(--border)] rounded-2xl p-3 bg-white">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Finder patterns */}
              <rect x="5" y="5" width="25" height="25" fill="none" stroke="#1a2980" strokeWidth="3" rx="2"/>
              <rect x="11" y="11" width="13" height="13" fill="#1a2980" rx="1"/>
              <rect x="70" y="5" width="25" height="25" fill="none" stroke="#1a2980" strokeWidth="3" rx="2"/>
              <rect x="76" y="11" width="13" height="13" fill="#1a2980" rx="1"/>
              <rect x="5" y="70" width="25" height="25" fill="none" stroke="#1a2980" strokeWidth="3" rx="2"/>
              <rect x="11" y="76" width="13" height="13" fill="#1a2980" rx="1"/>
              {/* Data modules pattern */}
              {[35,38,41,44,47,50,53,56,59,62,65].map((x, i) =>
                [35,38,41,44,47,50,53,56,59,62,65].map((y, j) =>
                  (i + j) % 3 !== 0 ? <rect key={`${i}-${j}`} x={x} y={y} width="2.5" height="2.5" fill="#1a2980" /> : null
                )
              )}
              {/* Logo */}
              <rect x="43" y="43" width="14" height="14" fill="white" rx="2"/>
              <text x="50" y="53" textAnchor="middle" fill="#1a2980" fontSize="7" fontWeight="bold">1Fi</text>
            </svg>
          </div>

          <div className="w-full bg-[var(--muted)] rounded-2xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[var(--muted-foreground)]">UPI ID</p>
              <p className="text-sm font-bold text-[var(--foreground)]">{UPI_ID}</p>
            </div>
            <button
              onClick={handleCopy}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${copied ? "bg-green-100 text-green-700" : "bg-[var(--primary)] text-white"}`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          {[
            { emoji: "📤", label: "Share QR Code" },
            { emoji: "💾", label: "Save QR Code" },
          ].map(({ emoji, label }) => (
            <button
              key={label}
              className="flex items-center justify-center gap-2 bg-white border border-[var(--border)] rounded-2xl py-4 text-sm font-semibold text-[var(--foreground)]"
            >
              <span className="text-xl">{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="bg-[var(--secondary)] rounded-2xl px-4 py-3 w-full">
          <p className="text-xs text-[var(--primary)] font-semibold mb-1">💡 Tip</p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Share your QR code or UPI ID with anyone to receive money instantly — works across all UPI apps.
          </p>
        </div>
      </div>
    </div>
  );
}
