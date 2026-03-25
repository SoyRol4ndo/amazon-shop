import Link from 'next/link'

const CATEGORIES = ['Electronics', 'Computers', 'Fashion', 'Home', 'Sports']

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-white font-semibold mb-3">Amazon Shop</h3>
          <p className="leading-relaxed">
            Tu tienda online de confianza. Encuentra los mejores productos al mejor precio.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Navegación</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Inicio</Link></li>
            <li><Link href="/products" className="hover:text-orange-400 transition-colors">Productos</Link></li>
            <li><Link href="/favorites" className="hover:text-orange-400 transition-colors">Favoritos</Link></li>
            <li><Link href="/cart" className="hover:text-orange-400 transition-colors">Carrito</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Categorías</h3>
          <ul className="space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link href={`/category/${cat.toLowerCase()}`} className="hover:text-orange-400 transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs">
        <p>© {new Date().getFullYear()} Amazon Shop. Proyecto de portafolio.</p>
      </div>
    </footer>
  )
}
