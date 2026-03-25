import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos",
  description: "Explora nuestro catálogo completo de productos.",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
      <p className="mt-2 text-gray-500">Explora nuestro catálogo</p>
      {/* TODO: Filtros, grid de productos */}
    </div>
  );
}
