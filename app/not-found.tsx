import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-8xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Página no encontrada</h2>
      <p className="mt-2 text-gray-500">Lo sentimos, la página que buscas no existe.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
