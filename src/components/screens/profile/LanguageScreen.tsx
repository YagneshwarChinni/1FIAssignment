import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
];

export default function LanguageScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState("en");

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Language" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className="w-full flex items-center justify-between px-4 py-4"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-[var(--foreground)]">{lang.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{lang.native}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selected === lang.code ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"}`}>
                {selected === lang.code && <span className="w-2 h-2 bg-white rounded-full block" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
