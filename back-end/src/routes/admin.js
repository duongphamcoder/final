import express from 'express';

import { adminController } from '../controllers/index.js';

export const AdminRoutes = express.Router();

AdminRoutes.get('/home', adminController.home);
