import { Status } from '../constants/index.js';
import { authService } from '../services/index.js';

const signup = async (req, res) => {
  const data = req.body;
  const { status, ...rest } = await authService.handleSignUp(data);

  return res.status(status).json({
    ...rest,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { status, ...rest } = await authService.handleSignIn(email, password);

  return res.status(status).json({
    ...rest,
  });
};

const signInWithAdmin = async (req, res) => {
  const { email, password } = req.body;
  const { status, ...rest } = await authService.handleSignIn(
    email,
    password,
    true
  );

  return res.status(status).json({
    ...rest,
  });
};

const verifyToken = async (req, res, next) => {
  const isToken = req.headers.authorization;
  const token = isToken ? isToken.split(' ')[1] : '';
  const { status, ...rest } = await authService.handleVerifiToken(token);

  if (status !== Status.success) {
    return res.status(status).json({
      ...rest,
    });
  }

  req.roleId = rest.data.role;
  req.userId = rest.data.id.trim();

  next();
};

const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, async () => {
    const role_id = req.roleId;

    const { status, ...rest } = await authService.handleVerifyAdmin(role_id);

    if (status !== Status.success) {
      return res.status(status).json({
        ...rest,
      });
    }

    next();
  });
};

const refreshToken = async (req, res) => {
  const isToken = req.headers.authorization;
  const token = isToken ? isToken.split(' ')[1] : '';

  const { status, ...rest } = await authService.handleRefreshToken(token);

  return res.status(status).json({
    ...rest,
  });
};

export const authController = {
  signup,
  signIn,
  verifyToken,
  verifyAdmin,
  signInWithAdmin,
  refreshToken,
};
