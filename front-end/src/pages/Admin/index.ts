import { lazy } from 'react';

const AdminHome = lazy(() => import('pages/Admin/Home'));
const AdminLogin = lazy(() => import('pages/Admin/Login'));
const AdminProduct = lazy(() => import('pages/Admin/Product'));
const AdminUser = lazy(() => import('pages/Admin/User'));
const AdminCategory = lazy(() => import('pages/Admin/Category'));

export { AdminHome, AdminLogin, AdminProduct, AdminUser, AdminCategory };
