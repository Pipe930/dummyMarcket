import { Product } from './product';

export interface ResponseProducts {
  products: Array<Product>;
  total: number;
  skip: number;
  limit: number;
}
