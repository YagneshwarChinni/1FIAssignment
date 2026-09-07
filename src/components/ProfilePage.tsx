import { useState } from "react";
import { ChevronRight } from "@/components/Icons";
import PersonalDetailsScreen from "@/components/screens/profile/PersonalDetailsScreen";
import LinkedBanksScreen from "@/components/screens/profile/LinkedBanksScreen";
import AddressScreen from "@/components/screens/profile/AddressScreen";
import EMIPlansScreen from "@/components/screens/profile/EMIPlansScreen";
import AutoPayScreen from "@/components/screens/profile/AutoPayScreen";
import NotificationsScreen from "@/components/screens/profile/NotificationsScreen";
import SecurityScreen from "@/components/screens/profile/SecurityScreen";
import LanguageScreen from "@/components/screens/profile/LanguageScreen";
import HelpSupportScreen from "@/components/screens/profile/HelpSupportScreen";
import TermsScreen from "@/components/screens/profile/TermsScreen";
import AboutScreen from "@/components/screens/profile/AboutScreen";

type Screen =
  | "profile"
  | "personal"
  | "banks"
  | "address"
  | "emiplans"
  | "autopay"
  | "notifications"
  | "security"
  | "language"
  | "help"
  | "terms"
  | "about";

type MenuItem = {
  emoji: string;
  label: string;
  sub: string;
  screen: Screen;
};

const sections: { title: string; items: MenuItem[] }[] = [
  {
    title: "Account",
    items: [
      { emoji: "👤", label: "Personal Details", sub: "Name, DOB, PAN", screen: "personal" },
      { emoji: "🏦", label: "Linked Bank Accounts", sub: "2 accounts linked", screen: "banks" },
      { emoji: "📍", label: "Address", sub: "Bengaluru, Karnataka", screen: "address" },
    ],
  },
  {
    title: "Payments & Cards",
    items: [
      { emoji: "📅", label: "EMI Plans", sub: "1 active plan", screen: "emiplans" },
      { emoji: "🔄", label: "AutoPay Settings", sub: "Enabled", screen: "autopay" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { emoji: "🔔", label: "Notifications", sub: "All alerts on", screen: "notifications" },
      { emoji: "🔒", label: "Privacy & Security", sub: "Biometric on", screen: "security" },
      { emoji: "🌐", label: "Language", sub: "English", screen: "language" },
    ],
  },
  {
    title: "Support",
    items: [
      { emoji: "💬", label: "Help & Support", sub: "Chat, call, or email", screen: "help" },
      { emoji: "📄", label: "Terms & Conditions", sub: "", screen: "terms" },
      { emoji: "ℹ️", label: "About 1Fi", sub: "v3.4.1", screen: "about" },
    ],
  },
];

export default function ProfilePage() {
  const [screen, setScreen] = useState<Screen>("profile");
  const [showLogout, setShowLogout] = useState(false);

  if (screen === "personal") return <PersonalDetailsScreen onBack={() => setScreen("profile")} />;
  if (screen === "banks") return <LinkedBanksScreen onBack={() => setScreen("profile")} />;
  if (screen === "address") return <AddressScreen onBack={() => setScreen("profile")} />;
  if (screen === "emiplans") return <EMIPlansScreen onBack={() => setScreen("profile")} />;
  if (screen === "autopay") return <AutoPayScreen onBack={() => setScreen("profile")} />;
  if (screen === "notifications") return <NotificationsScreen onBack={() => setScreen("profile")} />;
  if (screen === "security") return <SecurityScreen onBack={() => setScreen("profile")} />;
  if (screen === "language") return <LanguageScreen onBack={() => setScreen("profile")} />;
  if (screen === "help") return <HelpSupportScreen onBack={() => setScreen("profile")} />;
  if (screen === "terms") return <TermsScreen onBack={() => setScreen("profile")} />;
  if (screen === "about") return <AboutScreen onBack={() => setScreen("profile")} />;

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <div className="bg-[var(--primary)] px-4 pt-10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-2xl font-black text-[var(--primary)]">
            R
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Rahul Mehta</h1>
            <p className="text-xs text-white/50">rahul.mehta@email.com</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
              <span className="text-[10px] text-white/60 font-semibold">KYC Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 -mt-4 bg-white border border-[var(--border)] rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm mb-2">
        <div>
          <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest font-bold">Credit Score</p>
          <p className="text-2xl font-black text-[var(--primary)]">762</p>
          <p className="text-[11px] text-[var(--accent)] font-bold" style={{ color: "#16a34a" }}>Excellent ↑ 12 pts</p>
        </div>
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8eaf6" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a2980" strokeWidth="3"
              strokeDasharray={`${(762 / 900) * 100} 100`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] font-bold text-[var(--primary)]">762</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5 pb-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setScreen(item.screen)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[var(--muted)] transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-[var(--muted)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{item.label}</p>
                    {item.sub && <p className="text-[11px] text-[var(--muted-foreground)]">{item.sub}</p>}
                  </div>
                  <ChevronRight size={15} className="text-[var(--muted-foreground)] flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowLogout(true)}
          className="w-full bg-red-50 border border-red-200 text-red-600 font-semibold text-sm py-3.5 rounded-2xl"
        >
          Log Out
        </button>

        <div className="h-2" />
      </div>

      {/* Logout confirmation modal */}
      {showLogout && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl px-4 pt-6 pb-8">
            <div className="w-12 h-1 bg-[var(--border)] rounded-full mx-auto mb-5" />
            <p className="text-lg font-bold text-[var(--foreground)] mb-1 text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>Log Out?</p>
            <p className="text-sm text-[var(--muted-foreground)] text-center mb-6">You will need to sign in again to access your account.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 bg-[var(--muted)] text-[var(--foreground)] font-bold py-3.5 rounded-2xl text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 bg-red-500 text-white font-black py-3.5 rounded-2xl text-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
