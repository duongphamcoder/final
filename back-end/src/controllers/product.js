import { productService } from '../services/index.js';

const getPorducts = async (req, res) => {
  const { id } = req.params;
  const { status, ...rest } = await productService.handleGetProducts(id);

  return res.status(status).json({ ...rest });
};

const getPorductsByCategory = async (req, res) => {
  const { name } = req.params;
  const { status, ...rest } = await productService.handleGetProductsByCategory(
    name.trim()
  );

  return res.status(status).json({ ...rest });
};

const addProduct = async (req, res) => {
  const { category_id, ...restBody } = req.body;
  const { status, ...rest } = await productService.handleAddProduct(
    category_id,
    {
      ...restBody,
    }
  );

  return res.status(status).json({ ...rest });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { status, ...rest } = await productService.handleUpdateProduct(
    id,
    req.body
  );

  return res.status(status).json({
    ...rest,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { status, ...rest } = await productService.handleDeleteProduct(
    id,
    req.body
  );

  return res.status(status).json({
    ...rest,
  });
};

export const productsController = {
  getPorducts,
  getPorductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
