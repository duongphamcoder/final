/* eslint-disable no-unused-vars */
export enum STORE_KEY {
  TOKEN = 'token',
  ADMIN_TOKEN = 'adminToken',
  IS_LOGIN = 'isLogin',
}

export enum TITLE {
  SIGNIN = 'singin',
  SIGNUP = 'singup',
  error = 'Error',
  SUCCESS = 'Success',
}

export enum MESSAGES {
  ALREADY_EXIST = 'already exists ',
  SIGNUP_SUCCESS = 'Signup success ',
  ERROR = 'Something went wrong',
  EMPTY_TITLE = 'Oops! Nothing match with your keyword!',
  EMPTY_DESCRIPTION = 'You can search with other keyword or add another new book',
  ERROR_TITLE = 'Oops! Something went wrong',
  ERROR_DESCRIPTION = 'Please, help me reload pages.',
  UPLOAD_IMAGE_FAILED = 'An error occurred while uploading the image',
  UPDATE_SUCCESS = 'Updated successfully',
  ADD_SUCCESS = 'Added successfully',
  EMPTY_PRODUCT = 'There are currently no products in this category!',
  PHONE_FORMAT = 'Please enter a 10-digit phone number.',
  IS_QUIRE = 'Please, enter full information',
  EMPTY_ORDER = "You don't have any orders yet.",
  EMPTY_DELIVERY = 'Place an order.',
}

export enum ROUTES {
  ROOT = '/',
  LOGIN_ADMIN = '/admin/login',
  ADMIN_HOME = '/admin',
  USER = '/user',
  PROFILE = 'profile',
  ORDER = 'orders',
  DELIVERING = 'delivering',
  ADMIN_PRODUCTS = 'products',
  ADMIN_USERS = 'users',
  ADMIN_CATEGORIES = 'categories',
}

export enum ENDPOINT {
  LOGIN_USER = 'auth/signin',
  LOGIN_ADMIN = 'auth/signin-admin',
  SIGNUP = 'auth/signup',
  VERIFY_ADMIN = 'auth/verify-admin',
  VERIFY_USER = 'auth/verify-user',
  CARTS = 'carts',
  ORDER = 'orders',
  ORDER_DETAIL = 'orders/details',
  CATEGORIES = 'categories',
  DELIVERING = 'deliver',
  PRODUCT_BY_CATEGORIES = 'products/categories',
  PRODUCT = 'products',
  USER = 'users',
  ADMIN_ROOT = 'admin',
  ADMIN_HOME = 'admin/home',
}

export enum SEARCH_PARAMS {
  PAGE = 'page',
}

export enum STATISTICAL_TITLE {
  TOTAL_REVENUE = 'total revenue',
  NUMBER_OF_ORDERS_PROCESSED = 'number of orders processed',
  ORDER_IS_BEING_PROCESSED = 'ordering is being processed',
}

export const REGEXPS: Readonly<{
  [key: string]: RegExp;
}> = {
  PHONE: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

export const RECORD = 4;
