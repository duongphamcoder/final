// Services
import { cartsService } from '../services/index.js';

const getCarts = async (req, res) => {
  const { status, ...rest } = await cartsService.handleGetCartsByUserId(
    req.userId
  );

  return res.status(status).json({ ...rest });
};

const addToCarts = async (req, res) => {
  const { productId, quantity } = req.body;

  const userId = req.userId;

  const { status, ...rest } = await cartsService.handleAddToCart(
    userId.trim(),
    (productId || '').trim(),
    parseInt(quantity)
  );

  return res.status(status).json({ ...rest });
};

const change = async (req, res) => {
  const fields = req.body;
  const cartId = req.params.cartId;

  const { status, ...rest } = await cartsService.handleChange(cartId, fields);

  return res.status(status).json({ ...rest });
};

const deleteProductFromCart = async (req, res) => {
  const cartId = req.params.cartId;

  const { status, ...rest } = await cartsService.handleRemoveProductFormCart(
    cartId
  );

  return res.status(status).json({ ...rest });
};
export const cartsController = {
  getCarts,
  addToCarts,
  change,
  deleteProductFromCart,
};
