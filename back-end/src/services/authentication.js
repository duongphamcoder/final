import bcrypt, { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

// Models
import { UserModel, RoleModel, TokenModel } from '../models/index.js';

// Helpers
import { getMessage } from '../helpers/index.js';

// Constants
import {
  Status,
  ROLES,
  Messages,
  saltRound,
  EXPIRES,
} from '../constants/index.js';

// environment
import 'dotenv/config.js';

const handleSignUp = async (data) => {
  try {
    const { id } = await RoleModel.findOne({ name: ROLES.user });
    const isUser = await UserModel.findOne({ email: data.email, role_id: id });

    if (isUser) {
      return getMessage(Status.unauthorized, {});
    }

    const hashPassword = bcrypt.hashSync(data.password, saltRound);
    const user = new UserModel({
      ...data,
      password: hashPassword,
      roleId: id,
    });

    await user.save();

    return getMessage(Status.success, {});
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleSignIn = async (email, password, isAdmin = false) => {
  try {
    const siginWith = !isAdmin ? ROLES.user : ROLES.admin;
    const [role, isUser] = await Promise.all([
      RoleModel.findOne({ name: siginWith }),
      UserModel.findOne({ email, deleted: false }),
    ]);

    if (!isUser || isUser.roleId.toString() !== role.id.toString()) {
      return getMessage(Status.unauthorized, {}, Messages.loginFailed);
    }

    const isPassword = compareSync(password, isUser.password);

    if (!isPassword) {
      return getMessage(
        Status.unauthorized,
        { isPassword },
        Messages.loginFailed
      );
    }

    const acceptToken = jwt.sign(
      { id: isUser.id, role: role.id },
      // eslint-disable-next-line no-undef
      process.env.SECRET_KEY,
      {
        expiresIn: `${EXPIRES}s`,
      }
    );

    const isToken = await TokenModel.findOne({ userId: isUser.id });

    if (isToken) {
      await TokenModel.updateOne({ userId: isUser.id }, { acceptToken });

      return getMessage(Status.success, { acceptToken });
    }

    const newToken = new TokenModel({
      userId: isUser.id,
      acceptToken,
    });

    await newToken.save();

    return getMessage(Status.success, { acceptToken });
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleVerifiToken = async (token) => {
  let decode = {};
  try {
    const isToken = await TokenModel.findOne({ acceptToken: token });

    if (!isToken) {
      return getMessage(Status.forbidden, {
        isLoginRequired: true,
      });
    }

    // eslint-disable-next-line no-undef
    decode = jwt.verify(token, process.env.SECRET_KEY);

    return getMessage(Status.success, {
      ...decode,
    });
  } catch (error) {
    return getMessage(Status.forbidden, {
      isRefreshToken: true,
    });
  }
};

const handleVerifyAdmin = async (roleId) => {
  try {
    const role = await RoleModel.findOne({ name: ROLES.admin });
    console.log(role.id === roleId);

    if (role.id !== roleId) {
      return getMessage(
        Status.forbidden,
        {
          isLoginRequired: true,
        },
        'You are not admin'
      );
    }

    return getMessage(Status.success, {});
  } catch (error) {
    return getMessage(Status.unauthorized, {}, Messages.error);
  }
};

const handleRefreshToken = async (data) => {
  try {
    // eslint-disable-next-line no-undef
    const decode = jwt.decode(data, process.env.SECRET_KEY);

    const acceptToken = jwt.sign(
      {
        id: decode.id,
        role: decode.role,
      },
      // eslint-disable-next-line no-undef
      process.env.SECRET_KEY,
      {
        expiresIn: `${EXPIRES}s`,
      }
    );

    await TokenModel.updateOne({ userId: decode.id }, { acceptToken });

    return getMessage(Status.success, {
      newToken: acceptToken,
    });
  } catch (error) {
    return getMessage(Status.unauthorized, {}, Messages.error);
  }
};

export const authService = {
  handleSignUp,
  handleSignIn,
  handleVerifiToken,
  handleVerifyAdmin,
  handleRefreshToken,
};
