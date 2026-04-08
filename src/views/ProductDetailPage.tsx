import { Suspense } from "react";
import { ProductSkeleton } from "../features/products/components/ProductSkeleton";
import { ProductContent } from "../features/products/components/ProductContent";

interface ProductDetailPageProps {
  id: number;
}

export async function ProductDetailPage({ id }: ProductDetailPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent id={id} />
      </Suspense>
    </div>
  );
}
