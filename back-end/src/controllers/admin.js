import { adminService } from '../services/index.js';

const home = async (_, res) => {
  const { status, ...rest } = await adminService.getHome();

  return res.status(status).json({
    ...rest,
  });
};

export const adminController = {
  home,
};
