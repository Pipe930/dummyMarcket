import { CartArray } from './cart-array';

export interface Cart {
  carts: Array<CartArray>;
  total: number;
  skip: number;
  limit: number;
}
