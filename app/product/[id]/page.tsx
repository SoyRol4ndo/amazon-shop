import type { Metadata } from "next";
import { ProductDetailPage } from "@/src/views/ProductDetailPage";
import { getProductById } from "@/src/features/products/services/getProductById";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductById(Number(id));
    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return { title: "Producto no encontrado" };
  }
}

export default async function ProductRoute({ params }: Props) {
  const { id } = await params;
  return <ProductDetailPage id={Number(id)} />;
}
