import { useState } from "react";
import HomePage from "@/components/HomePage";
import CardsPage from "@/components/CardsPage";
import ShopPage from "@/components/ShopPage";
import InsightsPage from "@/components/InsightsPage";
import ProfilePage from "@/components/ProfilePage";

type NavTab = "home" | "cards" | "shop" | "insights" | "profile";

const navItems: { id: NavTab; emoji: string; label: string }[] = [
  { id: "home", emoji: "🏠", label: "Home" },
  { id: "cards", emoji: "💳", label: "Cards" },
  { id: "shop", emoji: "🛍️", label: "Shop" },
  { id: "insights", emoji: "📊", label: "Insights" },
  { id: "profile", emoji: "👤", label: "Profile" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("shop");
  const [shopHasDetail, setShopHasDetail] = useState(false);

  return (
    /* Outer wrapper — fills viewport on all devices */
    <div className="w-full h-full min-h-screen bg-[#0A0D1E] flex items-center justify-center">
      {/*
        Phone shell:
        - Mobile (<640px): full viewport, no border-radius
        - Tablet/Desktop (≥640px): centered 390×844 phone frame
      */}
      <div
        className="
          relative flex flex-col bg-[var(--background)] overflow-hidden
          w-full h-full
          sm:w-[390px] sm:h-[844px] sm:max-h-screen sm:rounded-[40px] sm:shadow-2xl sm:shadow-black/60
          sm:border sm:border-white/10
        "
        style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
      >
        {/* Status bar (decorative, shown only in framed view) */}
        <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-[var(--primary)] flex-shrink-0">
          <span className="text-white text-[11px] font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-white text-[11px]">●●●</span>
            <span className="text-white text-[11px]">WiFi</span>
            <span className="text-white text-[11px]">100%</span>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "home" && <HomePage />}
          {activeTab === "cards" && <CardsPage />}
          {activeTab === "shop" && (
            <ShopPage
              onDetailChange={setShopHasDetail}
              onGoToProfile={() => setActiveTab("profile")}
            />
          )}
          {activeTab === "insights" && <InsightsPage />}
          {activeTab === "profile" && <ProfilePage />}
        </div>

        {/* Bottom navigation */}
        {!shopHasDetail && (
          <nav className="flex-shrink-0 bg-white border-t border-[var(--border)] flex items-center justify-around px-1 py-2 sm:rounded-b-[40px]">
            {navItems.map(({ id, emoji, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  flex flex-col items-center gap-0.5 flex-1 py-2 rounded-xl transition-all duration-150
                  ${activeTab === id ? "bg-[var(--muted)]" : ""}
                `}
              >
                <span className="text-xl leading-none">{emoji}</span>
                <span
                  className={`text-[10px] font-semibold ${
                    activeTab === id ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </nav>
        )}

        {/* Home indicator bar (decorative) */}
        <div className="hidden sm:flex justify-center pb-2 flex-shrink-0 bg-white sm:rounded-b-[40px]">
          <div className="w-28 h-1 bg-[var(--border)] rounded-full" />
        </div>
      </div>
    </div>
  );
}
