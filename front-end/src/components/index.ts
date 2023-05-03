import { lazy } from 'react';

export {
  default as Notification,
  type NotificationProps,
} from './Notification';
export { default as Loading } from './Loading';
export { default as ShowMessage } from './ShowMessage';
export { default as Popup, type PopupProps } from './Popup';
export { default as Card, type CardProps } from './Card';
export { default as AdminCard } from './Card/AdminCard';
export { default as Error } from './Error';
export { default as Payment } from './Payment';
export { default as Cart } from './Cart';
export { default as Status, type StatusType } from './Status';
export { type OrderDetailType } from './OrderDetail';
export * from './Form';
export { default as Table } from './Table';

const OrderDetail = lazy(() => import('./OrderDetail'));
const AddProduct = lazy(() => import('./AddProduct'));
const Details = lazy(() => import('./Details'));
const SideBar = lazy(() => import('./SideBar'));

export { AddProduct, OrderDetail, Details, SideBar };
