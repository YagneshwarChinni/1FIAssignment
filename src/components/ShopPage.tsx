import { useState } from "react";
import { Product } from "@/data/products";
import ProductGrid from "./marketplace/ProductGrid";
import ProductDetail from "./marketplace/ProductDetail";
import { Store, MapPin, ShoppingBag, Bell, User } from "@/components/Icons";
import NotificationsScreen from "@/components/screens/profile/NotificationsScreen";

type Tab = "top-brands" | "nearby-stores" | "marketplace";

interface ShopPageProps {
  onDetailChange: (hasDetail: boolean) => void;
  onGoToProfile: () => void;
}

export default function ShopPage({ onDetailChange, onGoToProfile }: ShopPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("marketplace");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  function selectProduct(product: Product) {
    setSelectedProduct(product);
    onDetailChange(true);
  }

  function clearProduct() {
    setSelectedProduct(null);
    onDetailChange(false);
  }

  if (showNotifications) {
    return <NotificationsScreen onBack={() => setShowNotifications(false)} />;
  }

  const tabs: { id: Tab; label: string; icon: typeof Store }[] = [
    { id: "top-brands", label: "Top Brands", icon: Store },
    { id: "nearby-stores", label: "Nearby Stores", icon: MapPin },
    { id: "marketplace", label: "1Fi Marketplace", icon: ShoppingBag },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* 1Fi Shop Header */}
      <div className="bg-[var(--primary)] px-4 pt-10 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {/* 1Fi Logo mark */}
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
              <span className="text-[var(--primary)] text-xs font-black">1Fi</span>
            </div>
            <div>
              <h1 className="text-white text-base font-bold leading-tight">Shop</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotifications(true)}
              className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center relative active:bg-white/20"
            >
              <Bell size={17} className="text-white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent)] rounded-full" />
            </button>
            <button
              onClick={onGoToProfile}
              className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center active:bg-white/20"
            >
              <User size={17} className="text-white" />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); clearProduct(); }}
              className={`
                flex items-center gap-1.5 flex-shrink-0 text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-200
                ${activeTab === id
                  ? "bg-[var(--accent)] text-[var(--primary)]"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
                }
              `}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === "top-brands" && <BlankTab icon={Store} title="Top Brands" description="Explore products from premium brands — coming soon." />}
        {activeTab === "nearby-stores" && <BlankTab icon={MapPin} title="Nearby Stores" description="Find stores near you with 1Fi offers — coming soon." />}
        {activeTab === "marketplace" && (
          <div className="h-full relative overflow-hidden">
            {selectedProduct ? (
              <ProductDetail product={selectedProduct} onBack={clearProduct} />
            ) : (
              <div className="h-full flex flex-col pt-3">
                <ProductGrid onProductSelect={selectProduct} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BlankTab({ icon: Icon, title, description }: { icon: typeof Store; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <div className="w-20 h-20 bg-[var(--muted)] rounded-3xl flex items-center justify-center">
        <Icon size={32} className="text-[var(--muted-foreground)]" />
      </div>
      <div>
        <h3 className="text-base font-bold text-[var(--foreground)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>
    </div>
  );
}
