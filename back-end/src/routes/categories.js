import express from 'express';
import { authController, categoriesController } from '../controllers/index.js';

export const CategoriesRoutes = express.Router();

CategoriesRoutes.get(
  '/admin',
  authController.verifyAdmin,
  categoriesController.getCategoriesByAdmin
);

CategoriesRoutes.get('/', categoriesController.getCategories);

CategoriesRoutes.post(
  '/',
  authController.verifyAdmin,
  categoriesController.addCategories
);

CategoriesRoutes.patch(
  '/:id',
  // authController.verifyAdmin,
  categoriesController.updateCategories
);

CategoriesRoutes.delete(
  '/:id',
  authController.verifyAdmin,
  categoriesController.deleteCategory
);
