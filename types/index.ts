export interface ProductsItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

export type DataProducts = {
  limit: number;
  products: ProductsItem[];
  skip: number;
  total: number;
};

export interface CartsItem {
  id: number;
  products: CartsProducts[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}

export interface CartsProducts {
  id: number;
  discountPercentage: number;
  total: number;
  price: number;
  quantity: number;
  discountedPrice: number;
  title: string;
}

export type DataCarts = {
  limit: number;
  carts: CartsItem[];
  skip: number;
  total: number;
};
