import { Convert, Product } from 'types';

export type Cart = {
  _id: string;
  userId: string;
  productId: Convert<Product>;
  quantity: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
