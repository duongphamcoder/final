import express from 'express';
import { authController, productsController } from '../controllers/index.js';

export const ProductsRoutes = express.Router();

ProductsRoutes.get('/', productsController.getPorducts);

ProductsRoutes.get('/:id', productsController.getPorducts);

ProductsRoutes.get(
  '/categories/:name',
  productsController.getPorductsByCategory
);

ProductsRoutes.post(
  '/',
  authController.verifyAdmin,
  productsController.addProduct
);

ProductsRoutes.patch(
  '/:id',
  authController.verifyAdmin,
  productsController.updateProduct
);

ProductsRoutes.delete(
  '/:id',
  authController.verifyAdmin,
  productsController.deleteProduct
);
