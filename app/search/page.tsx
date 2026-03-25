import type { Metadata } from 'next'
import { SearchPage } from '@/src/views/SearchPage'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Resultados para "${q}"` : 'Buscar',
    description: q
      ? `Resultados de búsqueda para "${q}"`
      : 'Busca productos en Amazon Shop.',
  }
}

export default async function SearchRoute({ searchParams }: Props) {
  const { q } = await searchParams
  return <SearchPage query={q ?? ''} />
}
