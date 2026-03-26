import type { Metadata } from 'next'
import { FavoritesPage } from '@/src/views/FavoritesPage'

export const metadata: Metadata = {
  title: 'Mis Favoritos',
  description: 'Tus productos favoritos guardados.',
}

export default function FavoritesRoute() {
  return <FavoritesPage />
}
