import bcrypt from 'bcrypt';

// Models
import { UserModel, RoleModel } from '../models/index.js';

// Heplers
import { getMessage } from '../helpers/index.js';

// Constants
import { ROLES, Status, saltRound } from '../constants/index.js';

const handleGetUsers = async () => {
  try {
    const role = await RoleModel.findOne({ name: ROLES.user });
    const users = await UserModel.find({ roleId: role.id });

    return getMessage(Status.success, users);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.error, [], message);
  }
};

const handleGetUser = async (uid) => {
  try {
    const user = await UserModel.findById(uid);

    return getMessage(Status.success, user);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleUpdateUser = async (uid, fieldUpdate) => {
  try {
    await UserModel.findByIdAndUpdate(uid, {
      ...fieldUpdate,
      updatedAt: new Date(),
    });

    return getMessage(Status.success, {});
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleUpdatePassword = async (uid, password) => {
  try {
    const hashPassword = bcrypt.hashSync(password, saltRound);

    await UserModel.findByIdAndUpdate(uid, {
      password: hashPassword,
    });

    return getMessage(Status.success);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleUpdateByAdmin = async (uid, fieldUpdate) => {
  try {
    const rslt = await UserModel.findByIdAndUpdate(uid, {
      ...fieldUpdate,
      deletedAt: new Date(),
    });

    return getMessage(Status.success, rslt);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

export const userService = {
  handleGetUsers,
  handleGetUser,
  handleUpdateUser,
  handleUpdatePassword,
  handleUpdateByAdmin,
};
