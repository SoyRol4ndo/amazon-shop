"use client";

import { useFavoritesStore } from "@/src/features/favorites/store/useFavoritesStore";
import { CardItem } from "@/src/shared/ui/CardItem";
import Link from "next/link";

export function FavoritesPage() {
  const items = useFavoritesStore((s) => s.items);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-2xl bg-linear-to-r from-gray-900 to-gray-700 px-8 py-12 text-white">
        <h1 className="text-4xl font-bold">Mis Favoritos</h1>
        <p className="mt-2 text-gray-300">
          {items.length > 0
            ? `${items.length} producto${items.length !== 1 ? "s" : ""} guardado${items.length !== 1 ? "s" : ""}`
            : "Aún no tienes productos guardados"}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-lg">No tienes favoritos todavía</p>
          <p className="mt-1 text-sm">
            Presiona el corazón en cualquier producto para guardarlo aquí
          </p>
          <Link
            href="/"
            className="mt-6 rounded-lg bg-orange-400 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 transition-colors"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
