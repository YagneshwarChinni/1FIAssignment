import { useState } from "react";
import { Product, EmiPlan, ProductVariant, formatINR } from "@/data/products";
import {
  ArrowLeft, Star, ChevronRight, Check, Info,
  ShoppingCart, BadgePercent, Shield, Truck,
} from "@/components/Icons";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>(() => {
    const defaults: Record<string, ProductVariant> = {};
    product.variantGroups.forEach((g) => { defaults[g.label] = g.variants[0]; });
    return defaults;
  });
  const [selectedEmi, setSelectedEmi] = useState<EmiPlan | null>(null);
  const [emiExpanded, setEmiExpanded] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const variantPriceAdjustment = Object.values(selectedVariants).reduce((sum, v) => sum + v.priceModifier, 0);
  const finalPrice = product.basePrice + variantPriceAdjustment;

  if (orderPlaced) {
    return (
      <div className="flex flex-col h-full bg-[var(--background)]">
        <div className="flex flex-col items-center justify-center flex-1 px-6 text-center gap-6">
          <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center">
            <Check size={36} className="text-[var(--primary)]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[var(--foreground)] mb-1">Order Confirmed!</h2>
            <p className="text-sm text-[var(--muted-foreground)]">Your {product.name} is on its way.</p>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-2xl w-full p-4 text-left space-y-3">
            {[
              { label: "Product", value: product.name },
              { label: "Total Amount", value: formatINR(selectedEmi!.totalAmount) },
              { label: "Monthly EMI", value: `${formatINR(selectedEmi!.monthlyAmount)} × ${selectedEmi!.months} months` },
              { label: "Bank", value: selectedEmi!.bank },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">{label}</span>
                <span className="font-bold text-[var(--foreground)]">{value}</span>
              </div>
            ))}
          </div>
          <button onClick={onBack} className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-sm">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[var(--primary)] flex-shrink-0">
        <button onClick={onBack} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center active:bg-white/20">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-white/50 font-semibold uppercase tracking-widest">{product.brand}</p>
          <h2 className="text-sm font-bold text-white truncate">{product.name}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Product image */}
        <div className="relative bg-[var(--muted)] aspect-[4/3] overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[var(--primary)] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          <span className="absolute top-3 right-3 bg-[var(--accent)] text-[var(--primary)] text-[10px] font-black px-2.5 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        </div>

        <div className="px-4 py-4 space-y-5">
          {/* Price */}
          <div>
            <h1 className="text-base font-bold text-[var(--foreground)] leading-tight mb-1">{product.name}</h1>
            <p className="text-xs text-[var(--muted-foreground)] mb-3">{product.description}</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-lg px-2 py-0.5">
                <Star size={10} className="fill-green-600 text-green-600" />
                <span className="text-xs font-bold text-green-700">{product.rating}</span>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">{product.reviewCount.toLocaleString()} reviews</span>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-black text-[var(--foreground)]">{formatINR(finalPrice)}</span>
              <span className="text-sm text-[var(--muted-foreground)] line-through">{formatINR(product.mrp + variantPriceAdjustment)}</span>
              <span className="text-sm font-bold text-green-600">
                Save {formatINR((product.mrp + variantPriceAdjustment) - finalPrice)}
              </span>
            </div>
          </div>

          {/* Variants */}
          {product.variantGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest mb-2.5">
                {group.label}:{" "}
                <span className="text-[var(--foreground)] normal-case font-bold">
                  {selectedVariants[group.label]?.label}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {group.variants.map((variant) => {
                  const isSelected = selectedVariants[group.label]?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, [group.label]: variant }))}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                          : "bg-white border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]/40"
                      }`}
                    >
                      {variant.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Highlights */}
          <div className="bg-[var(--muted)] rounded-2xl p-4">
            <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-3">Highlights</p>
            <ul className="space-y-1.5">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[var(--foreground)]">
                  <div className="w-4 h-4 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={9} className="text-[var(--primary)]" />
                  </div>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Shield, label: "1-Year Warranty" },
              { icon: Truck, label: "Free Delivery" },
              { icon: BadgePercent, label: "Best Price" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 bg-white border border-[var(--border)] rounded-xl py-3">
                <Icon size={18} className="text-[var(--primary)]" />
                <span className="text-[10px] font-bold text-[var(--foreground)] text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* EMI Plans */}
          <div>
            <button
              onClick={() => setEmiExpanded(!emiExpanded)}
              className="flex items-center justify-between w-full mb-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                  <BadgePercent size={13} className="text-[var(--accent)]" />
                </div>
                <p className="text-sm font-bold text-[var(--foreground)]">EMI Options</p>
                <span className="text-[9px] bg-[var(--accent)] text-[var(--primary)] font-black px-2 py-0.5 rounded-full">
                  {product.emiPlans.filter((p) => p.interestRate === 0).length} No-Cost
                </span>
              </div>
              <ChevronRight
                size={16}
                className={`text-[var(--muted-foreground)] transition-transform duration-200 ${emiExpanded ? "rotate-90" : ""}`}
              />
            </button>

            {emiExpanded && (
              <div className="space-y-2">
                {product.emiPlans.map((plan) => {
                  const isSelected = selectedEmi?.id === plan.id;
                  const isNoCost = plan.interestRate === 0;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedEmi(isSelected ? null : plan)}
                      className={`w-full text-left rounded-2xl border-2 p-3.5 transition-all ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/5"
                          : "border-[var(--border)] bg-white hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-bold text-[var(--foreground)]">{plan.months} months</span>
                            {isNoCost && (
                              <span className="text-[9px] bg-[var(--accent)] text-[var(--primary)] font-black px-2 py-0.5 rounded-full">
                                0% interest
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--muted-foreground)]">{plan.bank}</p>
                          <div className="flex items-center gap-3 mt-1 text-[10px] text-[var(--muted-foreground)]">
                            <span>Total: {formatINR(plan.totalAmount)}</span>
                            {plan.processingFee > 0 && <span>Fee: {formatINR(plan.processingFee)}</span>}
                          </div>
                        </div>
                        <div className="text-right ml-3">
                          <p className="text-base font-black text-[var(--primary)]">{formatINR(plan.monthlyAmount)}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)]">per month</p>
                        </div>
                        <div className={`ml-3 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? "bg-[var(--accent)] border-[var(--accent)]" : "border-[var(--border)]"}`}>
                          {isSelected && <Check size={10} className="text-[var(--primary)]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="h-24" />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] px-4 py-3">
        {selectedEmi ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[var(--muted-foreground)] truncate">{selectedEmi.months}mo · {selectedEmi.bank}</p>
              <p className="text-sm font-black text-[var(--foreground)]">
                {formatINR(selectedEmi.monthlyAmount)}/mo
                <span className="text-xs font-normal text-[var(--muted-foreground)] ml-1.5">Total: {formatINR(selectedEmi.totalAmount)}</span>
              </p>
            </div>
            <button
              onClick={() => setOrderPlaced(true)}
              className="flex items-center gap-2 bg-[var(--accent)] text-[var(--primary)] font-black text-sm px-5 py-3.5 rounded-2xl active:scale-95 transition-transform"
            >
              <ShoppingCart size={15} />
              Proceed
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[11px] text-[var(--muted-foreground)]">Select an EMI plan above</p>
              <p className="text-sm font-black text-[var(--foreground)]">{formatINR(finalPrice)}</p>
            </div>
            <button disabled className="flex items-center gap-2 bg-[var(--muted)] text-[var(--muted-foreground)] font-bold text-sm px-5 py-3.5 rounded-2xl cursor-not-allowed">
              <Info size={15} />
              Select EMI
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
