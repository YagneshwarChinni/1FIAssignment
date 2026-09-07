import { Product, formatINR } from "@/data/products";
import { Star } from "@/components/Icons";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const savingsAmount = product.mrp - product.basePrice;
  const lowestEmi = product.emiPlans.reduce((min, p) =>
    p.monthlyAmount < min.monthlyAmount ? p : min
  );
  const hasNoCost = product.emiPlans.some((p) => p.interestRate === 0);

  return (
    <button
      onClick={() => onClick(product)}
      className="group bg-white rounded-2xl overflow-hidden text-left border border-[var(--border)] transition-all duration-200 active:scale-[0.97] hover:shadow-md hover:border-[var(--primary)]/20"
    >
      <div className="relative bg-[var(--muted)] overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[var(--primary)] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        <span className="absolute top-2 right-2 bg-[var(--accent)] text-[var(--primary)] text-[9px] font-black px-2 py-0.5 rounded-full">
          {product.discount}% off
        </span>
      </div>

      <div className="p-3">
        <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">{product.brand}</p>
        <h3 className="text-xs font-bold text-[var(--foreground)] leading-tight line-clamp-2 mb-2">{product.name}</h3>

        <div className="flex items-center gap-1 mb-2">
          <Star size={10} className="text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-bold text-[var(--foreground)]">{product.rating}</span>
          <span className="text-[10px] text-[var(--muted-foreground)]">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-[var(--foreground)]">{formatINR(product.basePrice)}</span>
            <span className="text-[10px] text-[var(--muted-foreground)] line-through">{formatINR(product.mrp)}</span>
          </div>
        </div>

        <div className="bg-[var(--muted)] rounded-xl px-2.5 py-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-[var(--muted-foreground)]">EMI from</p>
            {hasNoCost && <span className="text-[8px] font-black text-[var(--accent)] bg-[var(--primary)] px-1.5 py-0.5 rounded-full">0% interest</span>}
          </div>
          <p className="text-[11px] font-black text-[var(--primary)]">{formatINR(lowestEmi.monthlyAmount)}/mo</p>
        </div>
      </div>
    </button>
  );
}
