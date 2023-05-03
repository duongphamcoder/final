import { Routes as AuthRoutes } from './authentication.js';
import { UserRoutes } from './user.js';
import { ProductsRoutes } from './product.js';
import { CategoriesRoutes } from './categories.js';
import { OrderRoutes } from './order.js';
import { CartRoutes } from './cart.js';
import { AdminRoutes } from './admin.js';

export const routes = (app) => {
  app.use('/auth', AuthRoutes);

  app.use('/products', ProductsRoutes);

  app.use('/categories', CategoriesRoutes);

  app.use('/users', UserRoutes);

  app.use('/carts', CartRoutes);

  app.use('/orders', OrderRoutes);

  app.use('/admin', AdminRoutes);
};
