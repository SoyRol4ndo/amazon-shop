import { DealCard } from "@/src/features/deals/components/DealCard";
import type { Product } from "@/src/shared/types/dummyjson";

interface DealsSectionProps {
  products: Product[];
}

export function DealsSection({ products }: DealsSectionProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No hay ofertas disponibles en este momento.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product, index) => (
        <DealCard key={`${product.id}-${index}`} product={product} />
      ))}
    </div>
  );
}
