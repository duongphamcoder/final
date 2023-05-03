// Models
import { CartsModel } from '../models/index.js';

// Helpers
import { getMessage } from '../helpers/index.js';

// Constants
import { Status } from '../constants/index.js';

const handleGetCartsByUserId = async (userId) => {
  try {
    const carts = await CartsModel.find({
      userId,
    })
      .populate('productId', 'name price imageURL')
      .exec();

    return getMessage(Status.success, carts || []);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.error, [], message);
  }
};

const handleAddToCart = async (userId, productId, quantity) => {
  try {
    const isProduct = await CartsModel.findOne({ userId, productId });

    if (isProduct) {
      const newQuantity = quantity + isProduct.quantity;

      await CartsModel.findByIdAndUpdate(isProduct.id, {
        quantity: newQuantity,
      });

      return getMessage(Status.success, {});
    }

    const cart = new CartsModel({
      userId,
      productId,
      quantity,
    });

    const data = await cart.save();

    return getMessage(Status.success, data);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.error, [], message);
  }
};

const handleChange = async (cartId, updateData) => {
  try {
    await CartsModel.findOneAndUpdate(
      { id: cartId },
      {
        ...updateData,
      }
    );

    return getMessage(Status.success, {});
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.error, [], message);
  }
};

const handleRemoveProductFormCart = async (cartId) => {
  try {
    await CartsModel.findOneAndDelete({ id: cartId });

    return getMessage(Status.success, {});
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.error, [], message);
  }
};

export const cartsService = {
  handleGetCartsByUserId,
  handleAddToCart,
  handleChange,
  handleRemoveProductFormCart,
};
