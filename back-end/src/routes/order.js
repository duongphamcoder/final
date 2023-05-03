import express from 'express';
import { ordersController, authController } from '../controllers/index.js';

export const OrderRoutes = express.Router();

OrderRoutes.get('/', authController.verifyToken, ordersController.getByUserId);

OrderRoutes.get(
  '/deliver',
  authController.verifyToken,
  ordersController.getOrderDeliverByUserId
);

OrderRoutes.post('/', authController.verifyToken, ordersController.payment);

OrderRoutes.patch('/:oid', ordersController.changeData);

OrderRoutes.get('/details/:oid', ordersController.getById);
