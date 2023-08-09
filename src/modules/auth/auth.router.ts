import express from 'express';
import { AuthController } from './auth.controller';
import * as validate from './auth.validation';

const route = express.Router();

const userCtrl = new AuthController();

route.post('/login', validate.loginValidation, userCtrl.login);

route.post('/signup', validate.signupValidation, userCtrl.signup);

export default route;
