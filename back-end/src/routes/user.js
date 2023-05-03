/* eslint-disable no-unused-vars */
import express from 'express';
import { authController, usersController } from '../controllers/index.js';

export const UserRoutes = express.Router();

//---------- Users -----------------------------

UserRoutes.get('/', authController.verifyToken, usersController.getUser);

UserRoutes.get('/admin', authController.verifyAdmin, usersController.getUsers);

UserRoutes.patch('/', authController.verifyToken, usersController.updateUser);

UserRoutes.patch(
  '/password/:id',
  authController.verifyToken,
  usersController.updatePasswordUser
);

UserRoutes.patch(
  '/:id',
  authController.verifyAdmin,
  usersController.updateUserByAdmin
);
