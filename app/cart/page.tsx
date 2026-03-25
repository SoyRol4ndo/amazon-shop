import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carrito de Compras',
  description: 'Revisa los productos en tu carrito.',
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Carrito de Compras</h1>
      <p className="mt-2 text-gray-500">Tu carrito está vacío</p>
      {/* TODO: Lista de items, totales, botón de checkout */}
    </div>
  )
}
