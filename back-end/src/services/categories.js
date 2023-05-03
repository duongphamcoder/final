import { CategoryMessage, Status } from '../constants/index.js';
import { getMessage } from '../helpers/index.js';
import { CategoryModel } from '../models/index.js';

const handleGetCategories = async (isAdmin = false) => {
  try {
    if (isAdmin) {
      const categories = await CategoryModel.find().sort({
        createdAt: -1,
      });

      return getMessage(Status.success, categories);
    }

    const categories = await CategoryModel.find({
      deleted: false,
    });

    return getMessage(Status.success, categories);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleAddCategory = async (name) => {
  try {
    const categoryName = name.trim().toLowerCase();
    const isCategory = await CategoryModel.findOne({
      name: categoryName,
    });

    if (isCategory) {
      return getMessage(Status.unauthorized, {}, CategoryMessage.alreadyExist);
    }

    const category = new CategoryModel({
      name: categoryName,
    });

    const categoryRes = await category.save();

    return getMessage(Status.success, categoryRes);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleUpdateCategory = async (id, updateField) => {
  try {
    const update = await CategoryModel.findByIdAndUpdate(id, updateField);
    return getMessage(Status.success, update);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleDeleteCategory = async (id) => {
  try {
    const ct = await CategoryModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });

    return getMessage(Status.success, ct);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

export const categoriesService = {
  handleGetCategories,
  handleAddCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
