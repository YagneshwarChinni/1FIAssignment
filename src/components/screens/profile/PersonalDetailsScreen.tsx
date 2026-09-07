import { useState } from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

export default function PersonalDetailsScreen({ onBack }: { onBack: () => void }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Rahul Mehta");
  const [phone, setPhone] = useState("9876543210");
  const [email, setEmail] = useState("rahul.mehta@email.com");
  const [dob, setDob] = useState("15 Aug 1996");
  const [pan, setPan] = useState("ABCPM1234F");

  const fields = [
    { label: "Full Name", value: name, onChange: setName, type: "text" },
    { label: "Mobile Number", value: phone, onChange: setPhone, type: "tel" },
    { label: "Email Address", value: email, onChange: setEmail, type: "email" },
    { label: "Date of Birth", value: dob, onChange: setDob, type: "text" },
    { label: "PAN Number", value: pan, onChange: setPan, type: "text" },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <ScreenHeader
        title="Personal Details"
        onBack={onBack}
        right={
          <button onClick={() => setEditing(!editing)} className="text-xs font-bold text-white bg-white/20 px-3 py-1.5 rounded-xl">
            {editing ? "Save" : "Edit"}
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
        <div className="flex justify-center mb-2">
          <div className="w-20 h-20 rounded-full bg-[var(--secondary)] border-4 border-white shadow flex items-center justify-center text-4xl">
            🙂
          </div>
        </div>
        <div className="bg-white border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
          {fields.map(({ label, value, onChange, type }) => (
            <div key={label} className="px-4 py-3.5">
              <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">{label}</p>
              {editing ? (
                <input
                  type={type}
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
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-2">
          <span>✅</span>
          <p className="text-xs text-green-700 font-semibold">KYC Verified — All documents confirmed</p>
        </div>
      </div>
    </div>
  );
}
