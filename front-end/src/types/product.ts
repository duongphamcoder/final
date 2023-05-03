export type Product = {
  _id: string;
  name: string;
  price: number;
  imageURL: string;
  categoryId: string;
  isActive: boolean;
  deleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
