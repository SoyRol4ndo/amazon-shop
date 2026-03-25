import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: `Explora los mejores productos en la categoría ${name}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const name = decodeURIComponent(category);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 capitalize">{name}</h1>
      <p className="mt-2 text-gray-500">Productos en esta categoría</p>
      {/* TODO: Grid de productos filtrados por categoría */}
    </div>
  );
}
