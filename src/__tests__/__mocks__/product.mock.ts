import type { Product } from '@/src/shared/types/dummyjson'

export const mockProduct: Product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  category: 'smartphones',
  price: 549.99,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
  images: [
    'https://dummyjson.com/image/i/products/1/1.jpg',
    'https://dummyjson.com/image/i/products/1/2.jpg',
    'https://dummyjson.com/image/i/products/1/3.jpg',
  ],
}

export const mockProduct2: Product = {
  id: 2,
  title: 'iPhone X',
  description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display',
  category: 'smartphones',
  price: 899.99,
  discountPercentage: 17.94,
  rating: 4.44,
  stock: 34,
  brand: 'Apple',
  thumbnail: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
  images: [
    'https://dummyjson.com/image/i/products/2/1.jpg',
  ],
}
