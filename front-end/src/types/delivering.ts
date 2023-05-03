import { Product } from './product';

export type Delivering = {
  _id: string;
  createdAt: string;
  total: number;
  status: number;
  products: Product[];
  orderDetails: {
    quantity: number;
  }[];
};
