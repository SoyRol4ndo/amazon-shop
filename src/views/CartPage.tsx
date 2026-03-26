"use client";

import { useCartStore } from "@/src/features/cart/store/useCartStore";
import Link from "next/link";

export function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-2xl bg-linear-to-r from-gray-900 to-gray-700 px-8 py-12 text-white">
        <h1 className="text-4xl font-bold">Carrito de Compras</h1>
        <p className="mt-2 text-gray-300">
          {totalItems > 0
            ? `${totalItems} producto${totalItems !== 1 ? "s" : ""} en tu carrito`
            : "Tu carrito está vacío"}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-lg">No tienes productos en el carrito</p>
          <p className="mt-1 text-sm">Agrega productos desde la tienda</p>
          <Link
            href="/"
            className="mt-6 rounded-lg bg-orange-400 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 transition-colors"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => {
              const discountedPrice =
                item.price * (1 - item.discountPercentage / 100);
              return (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white rounded-xl p-4 shadow-sm"
                >
                  {/* Imagen */}
                  <Link href={`/product/${item.id}`} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-24 w-24 object-contain rounded-lg bg-gray-50 p-1"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-orange-500 transition-colors">
                        {item.title}
                      </p>
                    </Link>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-bold text-gray-900">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Controles cantidad + eliminar */}
                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-sm font-semibold text-gray-800 border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-gray-900">
                      ${(discountedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}

            <button
              onClick={clearCart}
              className="self-start text-sm text-red-400 hover:text-red-600 transition-colors mt-2"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-gray-900">
                Resumen del pedido
              </h2>

              <div className="flex flex-col gap-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} productos)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-4">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button className="w-full rounded-lg bg-orange-400 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors">
                Proceder al pago
              </button>

              <Link
                href="/"
                className="text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
