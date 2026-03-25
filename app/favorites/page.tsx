import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Favoritos",
  description: "Tus productos favoritos guardados.",
};

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Mis Favoritos</h1>
      <p className="mt-2 text-gray-500">No tienes productos favoritos aún</p>
      {/* TODO: Grid de favoritos */}
    </div>
  );
}
