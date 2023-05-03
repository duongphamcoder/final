import mongoose from 'mongoose';

const OrderDeatails = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'orders',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
    price: Number,
    quantity: Number,
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OrderDetailsModel = mongoose.model('orderDetails', OrderDeatails);

export default OrderDetailsModel;
