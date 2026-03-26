import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/src/shared/ui/Header";
import Footer from "@/src/shared/ui/Footer";
import { getCategories } from "@/src/features/products/services/getCategories";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Amazon Shop",
    template: "%s | Amazon Shop",
  },
  description:
    "Tu tienda online de confianza. Encuentra los mejores productos al mejor precio.",
  keywords: ["shop", "compras", "comprar", "tienda", "amazon"],
  icons: {
    icon: "/shop-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
