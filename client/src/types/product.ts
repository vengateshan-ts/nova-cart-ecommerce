export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews?: number;
  numReviews?: number;
  isNew?: boolean;
  isTrending?: boolean;
  isHot?: boolean;
  isBestSeller?: boolean;
  brand: string;
  stock?: number;
  countInStock?: number;
  discount?: number | string;
  deliveryDate?: string;
  highlights?: string[];
  createdAt?: string;
}
