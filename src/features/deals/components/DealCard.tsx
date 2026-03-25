import type { Product } from "@/src/shared/types/dummyjson";
import Link from "next/link";

export function DealCard({ product }: { product: Product }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      {/* Badge de descuento */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10">
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white leading-tight">
            -{Math.round(product.discountPercentage)}%
          </span>
        </div>
      )}

      {/* Imagen */}
      <div className="aspect-square bg-gray-50 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain group-hover:scale-115 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-3 flex-1">
        <p className="text-sm text-gray-800 line-clamp-2 font-medium leading-snug">
          {product.title}
        </p>

        {/* Precio */}
        <div className="mt-auto pt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-lg font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Ahorro */}
        {hasDiscount && (
          <p className="text-xs font-semibold text-green-600">
            Ahorras {Math.round(product.discountPercentage)}%
          </p>
        )}
      </div>
    </Link>
  );
}
