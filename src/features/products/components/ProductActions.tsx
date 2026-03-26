"use client";

import { useCartStore } from "@/src/features/cart/store/useCartStore";
import { useFavoritesStore } from "@/src/features/favorites/store/useFavoritesStore";
import { useIsMounted } from "@/src/shared/hooks/useIsMounted";
import { CartIcon } from "@/src/shared/icons/CartIcon";
import { FavoriteIcon } from "@/src/shared/icons/FavoriteIcon";
import type { Product } from "@/src/shared/types/dummyjson";

export function ProductActions({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id));
  const isInCart = useCartStore((s) => s.isAdded(product.id));

  const mounted = useIsMounted();
  const showAsFavorite = mounted && isFavorite;
  const showAsInCart = mounted && isInCart;

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => addToCart(product)}
        className={`flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
          showAsInCart
            ? "bg-orange-500 text-white"
            : "bg-orange-400 text-white hover:bg-orange-500"
        }`}
      >
        <CartIcon />
        {showAsInCart ? "Añadido al carrito" : "Agregar al carrito"}
      </button>

      <button
        onClick={() => toggleFavorite(product)}
        className={`flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-semibold border-2 transition-colors ${
          showAsFavorite
            ? "border-red-400 text-red-500 bg-red-50"
            : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-400"
        }`}
      >
        <FavoriteIcon isSelected={showAsFavorite} />
        {showAsFavorite ? "En favoritos" : "Agregar a favoritos"}
      </button>
    </div>
  );
}
