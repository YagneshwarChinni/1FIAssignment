import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

export default function AddressScreen({ onBack }: { onBack: () => void }) {
  const [editing, setEditing] = useState(false);
  const [line1, setLine1] = useState("42, Indiranagar 1st Stage");
  const [line2, setLine2] = useState("Near CMH Road");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560038");

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader
        title="Address"
        onBack={onBack}
        right={
          <button onClick={() => setEditing(!editing)} className="text-xs font-bold text-white bg-white/20 px-3 py-1.5 rounded-xl">
            {editing ? "Save" : "Edit"}
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] bg-white border border-[var(--border)] rounded-2xl px-4 py-3">
          <span className="text-xl">📍</span>
          <span>Current registered address</span>
        </div>
        <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
          {[
            { label: "Address Line 1", value: line1, onChange: setLine1 },
            { label: "Address Line 2", value: line2, onChange: setLine2 },
            { label: "City", value: city, onChange: setCity },
            { label: "State", value: state, onChange: setState },
            { label: "PIN Code", value: pincode, onChange: setPincode },
          ].map(({ label, value, onChange }) => (
            <div key={label} className="px-4 py-3.5">
              <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">{label}</p>
              {editing ? (
                <input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full text-sm font-semibold text-[var(--foreground)] bg-transparent outline-none border-b border-[var(--primary)] pb-0.5"
                />
              ) : (
                <p className="text-sm font-semibold text-[var(--foreground)]">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
