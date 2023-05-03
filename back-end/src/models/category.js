import mongoose from 'mongoose';
import { ProductModel } from './index.js';

const Categorys = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
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

const CategoriesModel = mongoose.model('categorys', Categorys);
const listener = CategoriesModel.watch();

listener.on('change', async (option) => {
  const type = option.operationType;
  const id = option.documentKey._id;

  if (type === 'update') {
    const updateField = option.updateDescription?.updatedFields;

    if (updateField && updateField.deleted !== undefined) {
      await ProductModel.updateMany(
        { categoryId: id },
        { isActive: !updateField.deleted }
      );
    }
  }
});

export default CategoriesModel;
