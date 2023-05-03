import { categoriesService } from '../services/index.js';

const getCategories = async (_, res) => {
  const { status, ...rest } = await categoriesService.handleGetCategories();

  return res.status(status).json({ ...rest });
};

const getCategoriesByAdmin = async (_, res) => {
  const { status, ...rest } = await categoriesService.handleGetCategories(true);

  return res.status(status).json({ ...rest });
};

const addCategories = async (req, res) => {
  const { name } = req.body;

  const { status, ...rest } = await categoriesService.handleAddCategory(
    name.trim()
  );

  return res.status(status).json({ ...rest });
};

const updateCategories = async (req, res) => {
  const { id } = req.params;
  const updateField = req.body;

  const { status, ...rest } = await categoriesService.handleUpdateCategory(
    id.trim(),
    updateField
  );

  return res.status(status).json({ ...rest });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const { status, ...rest } = await categoriesService.handleDeleteCategory(id);
  ``;
  return res.status(status).json({ ...rest });
};

export const categoriesController = {
  getCategories,
  getCategoriesByAdmin,
  addCategories,
  updateCategories,
  deleteCategory,
};
