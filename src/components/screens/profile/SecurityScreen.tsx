import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${on ? "bg-[var(--primary)]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function SecurityScreen({ onBack }: { onBack: () => void }) {
  const [biometric, setBiometric] = useState(true);
  const [twoFA, setTwoFA] = useState(true);
  const [txPin, setTxPin] = useState(true);
  const [showPinChange, setShowPinChange] = useState(false);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader title="Privacy & Security" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2 px-1">Authentication</p>
          <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
            {[
              { label: "Biometric Login", sub: "Face ID / Fingerprint", value: biometric, toggle: () => setBiometric(!biometric) },
              { label: "Two-Factor Auth", sub: "OTP on every login", value: twoFA, toggle: () => setTwoFA(!twoFA) },
              { label: "Transaction PIN", sub: "Required for payments", value: txPin, toggle: () => setTxPin(!txPin) },
            ].map(({ label, sub, value, toggle }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{sub}</p>
                </div>
                <Toggle on={value} onToggle={toggle} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2 px-1">PIN Management</p>
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowPinChange(!showPinChange)}
              className="w-full flex items-center justify-between px-4 py-3.5"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)] text-left">Change Transaction PIN</p>
                <p className="text-xs text-[var(--muted-foreground)]">Last changed 30 days ago</p>
              </div>
              <span className="text-[var(--primary)] text-xs font-bold">{showPinChange ? "Cancel" : "Change"}</span>
            </button>
            {showPinChange && (
              <div className="border-t border-[var(--border)] px-4 py-4 space-y-3">
                <input type="password" maxLength={6} value={oldPin} onChange={(e) => setOldPin(e.target.value)} placeholder="Current PIN (6 digits)" className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] tracking-widest" />
                <input type="password" maxLength={6} value={newPin} onChange={(e) => setNewPin(e.target.value)} placeholder="New PIN (6 digits)" className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--primary)] tracking-widest" />
                <button
                  disabled={oldPin.length < 6 || newPin.length < 6}
                  onClick={() => { setShowPinChange(false); setOldPin(""); setNewPin(""); }}
                  className="w-full bg-[var(--primary)] text-white font-bold py-3 rounded-xl text-sm disabled:opacity-40"
                >
                  Update PIN
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2 px-1">Data & Privacy</p>
          <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
            {["Download My Data", "Delete Account"].map((label) => (
              <button key={label} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                <p className={`text-sm font-semibold ${label === "Delete Account" ? "text-red-500" : "text-[var(--foreground)]"}`}>{label}</p>
                <span className="text-[var(--muted-foreground)] text-xs">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
