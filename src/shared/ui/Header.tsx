"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useIsMounted } from "@/src/shared/hooks/useIsMounted";
import { SearchInput } from "./SearchInput";
import { NAV_LINKS } from "../constants/navLinks";
import type { Category } from "@/src/shared/types/dummyjson";
import { useFavoritesStore } from "@/src/features/favorites/store/useFavoritesStore";
import { useCartStore } from "@/src/features/cart/store/useCartStore";
import { Badge } from "./Badge";

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const mounted = useIsMounted();

  const favoritesCount = useFavoritesStore((s) => s.items.length);
  const cartCount = useCartStore((s) => s.totalItems());

  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const badgeFor = (href: string) => {
    if (!mounted) return 0;
    if (href === "/favorites") return favoritesCount;
    if (href === "/cart") return cartCount;
    return 0;
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        {/* Hamburger — solo visible en móvil */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Abrir menú"
          className="md:hidden shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-bold text-orange-400 hover:text-orange-300 transition-colors"
        >
          Amazon Shop
        </Link>

        {/* Search — oculta en móvil, visible en tablet y desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-2xl relative"
        >
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </form>

        {/* Nav — desktop: icono + texto | tablet: solo iconos */}
        <nav className="hidden md:flex items-center gap-1 shrink-0 text-sm ml-auto">
          {NAV_LINKS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive(href)
                  ? "text-orange-400 bg-white/10"
                  : "hover:text-orange-400 hover:bg-white/5"
              }`}
            >
              <span className="relative">
                {icon}
                <Badge count={badgeFor(href)} />
              </span>
              <span className="text-xs leading-none hidden lg:block">
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Iconos carrito y favoritos — solo en móvil */}
        <div className="md:hidden ml-auto flex items-center gap-1">
          <Link
            href="/favorites"
            aria-label="Favoritos"
            className={`relative p-1.5 rounded-lg transition-colors ${
              isActive("/favorites")
                ? "text-orange-400 bg-white/10"
                : "hover:bg-white/10"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <Badge count={mounted ? favoritesCount : 0} />
          </Link>

          <Link
            href="/cart"
            aria-label="Carrito"
            className={`relative p-1.5 rounded-lg transition-colors ${
              isActive("/cart")
                ? "text-orange-400 bg-white/10"
                : "hover:bg-white/10"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <Badge count={mounted ? cartCount : 0} />
          </Link>
        </div>
      </div>

      {/* ── Menú móvil (drawer) ─────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-4 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="flex relative">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </form>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive(href)
                    ? "text-orange-400 bg-white/10"
                    : "hover:text-orange-400 hover:bg-white/5"
                }`}
              >
                <span className="relative">
                  {icon}
                  <Badge count={badgeFor(href)} />
                </span>
                {label}
                {badgeFor(href) > 0 && (
                  <span className="ml-auto text-xs font-bold text-orange-400">
                    {badgeFor(href)}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* ── Categorías ─────────────────────────────────────────────────── */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="bg-gray-800 container mx-auto px-4 py-2 flex items-center gap-6 text-sm overflow-x-auto categories-scroll">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              className={`whitespace-nowrap transition-colors shrink-0 ${
                pathname === `/category/${cat.slug}`
                  ? "text-orange-400 font-medium"
                  : "hover:text-orange-400"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
