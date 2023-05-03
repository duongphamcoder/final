/* eslint-disable no-unused-vars */
import express from 'express';
import { authController } from '../controllers/index.js';

export const Routes = express.Router();

// Test logical

// Verify user
Routes.get('/verify-user', authController.verifyToken, (req, res) => {
  return res.status(200).json({
    data: '',
  });
});

// Verify admin
Routes.get('/verify-admin', authController.verifyAdmin, (req, res) => {
  return res.status(200).json({
    data: '',
  });
});

//-------------------------------------

Routes.post('/signup', authController.signup);

Routes.post('/signin', authController.signIn);

Routes.post('/signin-admin', authController.signInWithAdmin);

Routes.get('/refresh', authController.refreshToken);
