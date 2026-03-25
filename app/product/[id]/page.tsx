import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// En el futuro podemos hacer fetch del producto real aquí para el metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Producto ${id}`,
    description: `Detalles del producto ${id}`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Detalle del Producto</h1>
      <p className="mt-2 text-gray-500">ID: {id}</p>
      {/* TODO: Imágenes, descripción, precio, agregar al carrito, reseñas */}
    </div>
  );
}
