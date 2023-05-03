/* eslint-disable no-unused-vars */
export enum STORE_KEY {
  TOKEN = 'token',
  ADMIN_TOKEN = 'adminToken',
  IS_LOGIN = 'isLogin',
}

export enum TITLE {
  SIGNIN = 'Đăng nhập',
  SIGNUP = 'Đăng ký',
  error = 'Lỗi',
  SUCCESS = 'Thành công',
  UPDATE = 'Cập nhật',
  DEL = 'Xóa',
  ADD = 'Thêm',
}

export enum MESSAGES {
  ALREADY_EXIST = 'Đã tồn tại',
  SIGNUP_SUCCESS = 'Đăng ký thành công',
  ERROR = 'Đã xãy ra một lỗi không mong muốn',
  EMPTY_TITLE = 'Oops! Không có giá trị nào phù hợp!',
  EMPTY_DESCRIPTION = 'Bạn có thể tìm kiếm bằng từ khóa',
  ERROR_TITLE = 'Oops! Đã xãy ra lỗi không mong muốn',
  ERROR_DESCRIPTION = 'Vui lòng tải lại trang.',
  UPLOAD_IMAGE_FAILED = 'Đã có lỗi xẩy ra trong khi đăng ảnh',
  UPDATE_SUCCESS = 'Cập nhật thành công',
  ADD_SUCCESS = 'Thêm thành công',
  EMPTY_PRODUCT = 'Hiện không có sản phẩm nào phù hợp!',
  PHONE_FORMAT = 'Vui lòng nhập 10 ký tự.',
  EMAIL_FORMAT = 'Vui lòng nhập đúng định dạng email.',
  PASSWORD_FORMAT = 'Vui lòng nhập tối thiểu 6 kí tự.',
  IS_QUIRE = 'Vui lòng điền đầy đủ thông tin',
  EMPTY_ORDER = 'Bạn không có đơn hàng nào.',
  EMPTY_DELIVERY = 'Hãy đặt hàng.',
  NO_DATA = 'Không có dữ liệu.',
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
  MENU = 'menu',
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
  TOTAL_REVENUE = 'Tổng thu nhập',
  NUMBER_OF_ORDERS_PROCESSED = 'Số đơn giao thành công',
  ORDER_IS_BEING_PROCESSED = 'Số đơn chờ xử lý',
}

export const REGEXPS: Readonly<{
  [key: string]: RegExp;
}> = {
  PHONE: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  // eslint-disable-next-line no-useless-escape
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: /^[a-zA-Z0-9]{6,}$/,
};

export const RECORD = 4;
