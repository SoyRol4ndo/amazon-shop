import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Resultados para "${q}"` : "Buscar",
    description: q
      ? `Resultados de búsqueda para "${q}"`
      : "Busca productos en Amazon Shop.",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Resultados de búsqueda
      </h1>
      {q && (
        <p className="mt-2 text-gray-500">
          Mostrando resultados para:{" "}
          <span className="font-semibold text-gray-700">{`"${q}"`}</span>
        </p>
      )}
      {/* TODO: Grid de resultados, filtros */}
    </div>
  );
}
