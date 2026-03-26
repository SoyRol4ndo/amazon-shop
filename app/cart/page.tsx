import type { Metadata } from 'next'
import { CartPage } from '@/src/views/CartPage'

export const metadata: Metadata = {
  title: 'Carrito de Compras',
  description: 'Revisa los productos en tu carrito.',
}

export default function CartRoute() {
  return <CartPage />
}
