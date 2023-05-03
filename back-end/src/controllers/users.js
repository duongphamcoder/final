import { userService } from '../services/index.js';

const getUsers = async (req, res) => {
  const { status, ...rest } = await userService.handleGetUsers();

  return res.status(status).json({
    ...rest,
  });
};

const getUser = async (req, res) => {
  const id = req.userId;
  const { status, ...rest } = await userService.handleGetUser(id);

  return res.status(status).json({
    ...rest,
  });
};

const updateUser = async (req, res) => {
  const id = req.userId;
  const updateField = req.body;
  const { status, ...rest } = await userService.handleUpdateUser(
    id,
    updateField
  );

  return res.status(status).json({
    ...rest,
  });
};

const updatePasswordUser = async (req, res) => {
  const { id } = req.params;
  const password = req.body.password;
  const { status, ...rest } = await userService.handleUpdatePassword(
    id,
    password
  );

  return res.status(status).json({
    ...rest,
  });
};

const updateUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const updateField = req.body;

  const { status, ...rest } = await userService.handleUpdateByAdmin(
    id,
    updateField
  );

  return res.status(status).json({
    ...rest,
  });
};

export const usersController = {
  getUsers,
  getUser,
  updateUser,
  updatePasswordUser,
  updateUserByAdmin,
};
