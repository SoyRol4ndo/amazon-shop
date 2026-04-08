import Link from "next/link";
import { getProductById } from "../services/getProductById";
import { Breadcrumb } from "./Breadcrumb";
import { ProductActions } from "./ProductActions";
import { ImageGallery } from "./ImageGallery";

export async function ProductContent({ id }: { id: number }) {
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="flex flex-col items-center text-gray-400 py-24">
        <p className="text-lg">No se pudo cargar el producto.</p>
        <Link href="/" className="mt-4 text-sm text-orange-400 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <>
      <Breadcrumb product={product} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Columna izquierda — Imágenes */}
        <ImageGallery
          thumbnail={product.thumbnail}
          images={product.images}
          title={product.title}
        />

        {/* Columna derecha — Info */}
        <div className="flex flex-col gap-5">
          {/* Categoría y marca */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link
              href={`/category/${product.category}`}
              className="capitalize hover:text-orange-400 transition-colors"
            >
              {product.category}
            </Link>
            {product.brand && (
              <>
                <span>·</span>
                <span>{product.brand}</span>
              </>
            )}
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill={i < Math.round(product.rating) ? "#fb923c" : "none"}
                  stroke={
                    i < Math.round(product.rating) ? "#fb923c" : "#d1d5db"
                  }
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {product.rating}
            </span>
          </div>

          {/* Precio */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <p
            className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
          >
            {product.stock > 0
              ? `✓ En stock (${product.stock} disponibles)`
              : "✗ Sin stock"}
          </p>

          {/* Descripción */}
          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {product.description}
          </p>

          {/* Botones carrito / favoritos */}
          <div className="border-t border-gray-100 pt-4">
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </>
  );
}
