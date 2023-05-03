import { Status } from '../constants/index.js';
import { getMessage } from '../helpers/index.js';
import { ProductModel } from '../models/index.js';

/**
 * Lấy ra sản phẩm theo id hoặc tất cả sản phẩm
 * @param {*} id
 * @returns
 */
const handleGetProducts = async (id) => {
  try {
    const isId = id || '';

    if (isId) {
      const product = await ProductModel.findById(id);

      return getMessage(Status.success, product);
    }

    const products = await ProductModel.find();

    return getMessage(Status.success, products);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

/**
 * Lấy ra sản phẩm theo categories
 * @param {*} id
 * @returns
 */
const handleGetProductsByCategory = async (id) => {
  try {
    const products = await ProductModel.find({
      categoryId: id,
      isActive: true,
    });
    return getMessage(Status.success, products || []);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleAddProduct = async (category_id, product) => {
  try {
    const newProduct = new ProductModel({
      ...product,
      categoryId: category_id,
    });

    const productRes = await newProduct.save();

    return getMessage(Status.success, productRes);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleUpdateProduct = async (id, updateField) => {
  try {
    const productRes = await ProductModel.findByIdAndUpdate(id, {
      ...updateField,
      updatedAt: new Date(),
    });

    return getMessage(Status.success, {
      productRes,
    });
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleDeleteProduct = async (id) => {
  try {
    const rslt = await ProductModel.findOneAndUpdate(
      {
        id,
        isActive: true,
      },
      {
        isActive: false,
        deletedAt: new Date(),
      }
    );

    return getMessage(Status.success, rslt);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

export const productService = {
  handleGetProducts,
  handleGetProductsByCategory,
  handleAddProduct,
  handleUpdateProduct,
  handleDeleteProduct,
};
