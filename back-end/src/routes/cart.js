import express from 'express';
import { cartsController, authController } from '../controllers/index.js';

export const CartRoutes = express.Router();

CartRoutes.get('/', authController.verifyToken, cartsController.getCarts);

CartRoutes.post('/', authController.verifyToken, cartsController.addToCarts);

CartRoutes.delete(
  '/:cartId',
  authController.verifyToken,
  cartsController.deleteProductFromCart
);

CartRoutes.patch(
  '/:cartId',
  authController.verifyToken,
  cartsController.change
);
