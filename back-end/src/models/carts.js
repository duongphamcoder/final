import mongoose from 'mongoose';

const Carts = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
    quantity: Number,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartsModel = mongoose.model('Carts', Carts);

export default CartsModel;
