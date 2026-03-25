import type { Metadata } from 'next'
import { CategoryPage } from '@/src/views/CategoryPage'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const title = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title,
    description: `Explora los mejores productos en la categoría ${title}.`,
  }
}

export default async function CategoryRoute({ params }: Props) {
  const { category } = await params
  return <CategoryPage slug={category} />
}
