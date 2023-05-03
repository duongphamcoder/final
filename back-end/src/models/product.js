import mongoose from 'mongoose';
import CartsModel from './carts.js';

const Products = new mongoose.Schema(
  {
    name: String,
    price: Number,
    imageURL: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categorys',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const ProductsModel = mongoose.model('products', Products);
const listener = ProductsModel.watch();

listener.on('change', async (option) => {
  const type = option.operationType;
  const id = option.documentKey._id;

  if (type === 'update') {
    const keys = Object.keys(option.updateDescription.updatedFields);
    const { isActive } = option.updateDescription.updatedFields;

    if (keys.indexOf('isActive') !== -1) {
      await CartsModel.updateMany({ productId: id }, { active: isActive });
    }
  }
});

export default ProductsModel;
