import type { Metadata } from "next";
import { DealsPage } from "@/src/views/DealsPage";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Descubre los mejores productos en oferta en Amazon Shop.",
};

export default function HomePage() {
  return <DealsPage />;
}
