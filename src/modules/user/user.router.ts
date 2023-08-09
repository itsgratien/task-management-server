import express from 'express';
import { UserController } from './user.controller';
import * as validate from './user.validation';

const route = express.Router();

const userCtrl = new UserController();

/**
 * @description get current logged in user
 */
route.get('/me', userCtrl.me);

/**
 * @description edit profile of current logged in user
 */
route.put('/me', validate.editProfileValidation, userCtrl.editProfile);

export default route;
