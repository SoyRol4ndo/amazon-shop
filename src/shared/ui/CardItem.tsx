"use client";

import Link from "next/link";
import { useCartStore } from "@/src/features/cart/store/useCartStore";
import { useFavoritesStore } from "@/src/features/favorites/store/useFavoritesStore";
import { useIsMounted } from "@/src/shared/hooks/useIsMounted";
import { CartIcon } from "../icons/CartIcon";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import type { Product } from "@/src/shared/types/dummyjson";

export function CardItem({ product }: { product: Product }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  const addToCart = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id));
  const isInCart = useCartStore((s) => s.isAdded(product.id));

  const mounted = useIsMounted();
  const showAsFavorite = mounted && isFavorite;
  const showIsAdded = mounted && isInCart;

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
        <FavoriteIcon isSelected={showAsFavorite} />
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
          aria-label={showIsAdded ? "Añadido al carrito" : "Agregar al carrito"}
          className="mt-2 cursor-pointer flex items-center justify-center gap-2 w-full rounded-lg bg-orange-400 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-500"
        >
          <CartIcon />
          {showIsAdded ? "Añadido al carrito" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
