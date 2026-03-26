"use client";

import type { Product } from "@/src/shared/types/dummyjson";
import { useCartStore } from "@/src/features/cart/store/useCartStore";
import { useFavoritesStore } from "@/src/features/favorites/store/useFavoritesStore";
import Link from "next/link";
import { useIsMounted } from "@/src/shared/hooks/useIsMounted";

export function CardItem({ product }: { product: Product }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  const addToCart = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id));
  const isAdded = useCartStore((s) => s.isAdded(product.id));

  const mounted = useIsMounted();
  const showAsFavorite = mounted && isFavorite;
  const showIsAdded = mounted && isAdded;

  return (
    <div
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden flex flex-col border-2 transition-colors ${
        showIsAdded ? "border-orange-400" : "border-transparent"
      }`}
    >
      {/* Badge de descuento */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10">
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white leading-tight">
            -{Math.round(product.discountPercentage)}%
          </span>
        </div>
      )}

      {/* Botón favoritos — esquina superior derecha */}
      <button
        onClick={() => toggleFavorite(product)}
        aria-label={"Agregar a favoritos"}
        className="absolute top-2 cursor-pointer right-2 z-10 rounded-full bg-white/80 p-1.5 shadow-sm backdrop-blur-sm transition-colors hover:text-red-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          fill={showAsFavorite ? "currentColor" : "none"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            className={showAsFavorite ? "text-red-500" : "text-gray-400"}
          />
        </svg>
      </button>

      {/* Imagen — clickeable */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain group-hover:scale-115 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-1 p-3 flex-1">
        <Link href={`/product/${product.id}`} className="block">
          <p className="text-sm text-gray-800 line-clamp-2 font-medium leading-snug hover:text-orange-500 transition-colors">
            {product.title}
          </p>
        </Link>

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

        {/* Botón agregar al carrito */}
        <button
          onClick={() => addToCart(product)}
          aria-label="Agregar al carrito"
          className="mt-2 cursor-pointer flex items-center justify-center gap-2 w-full rounded-lg bg-orange-400 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
