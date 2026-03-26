import Link from "next/link";
import type { Product } from "@/src/shared/types/dummyjson";

interface BreadcrumbProps {
  product: Product;
}

export const Breadcrumb = ({ product }: BreadcrumbProps) => {
  return (
    <nav className="mb-6 text-sm text-gray-400 flex items-center gap-2">
      <Link href="/" className="hover:text-orange-400 transition-colors">
        Inicio
      </Link>
      <span>/</span>
      <Link
        href={`/category/${product.category}`}
        className="hover:text-orange-400 transition-colors capitalize"
      >
        {product.category}
      </Link>
      <span>/</span>
      <span className="text-gray-600 line-clamp-1">{product.title}</span>
    </nav>
  );
};
