import mongoose from 'mongoose';
import CartsModel from './carts.js';
import { OrderDetailModel } from './index.js';

const Orders = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    fullName: String,
    phoneNumber: String,
    address: String,
    total: Number,
    note: String,
    order_date: Date,
    isOnline: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const OrdersModel = mongoose.model('orders', Orders);
const listener = OrdersModel.watch();

listener.on('change', async (option) => {
  const type = option.operationType;
  const id = option.documentKey._id;

  if (type === 'insert') {
    const { userId } = option.fullDocument;

    return await CartsModel.deleteMany({
      userId,
      active: true,
    });
  }

  if (type === 'update') {
    return await OrderDetailModel.updateMany({ orderId: id }, { status: true });
  }
});

export default OrdersModel;
