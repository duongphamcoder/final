import { lazy } from 'react';

const HomeUser = lazy(() => import('pages/Users/Home'));
const Products = lazy(() => import('pages/Users/Products'));
const Profile = lazy(() => import('pages/Users/Profile'));
const Orders = lazy(() => import('pages/Users/Orders'));
const Delivering = lazy(() => import('pages/Users/Delivering'));

export { HomeUser, Profile, Products, Orders, Delivering };
