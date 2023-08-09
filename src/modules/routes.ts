import express from 'express';
import { httpCode } from '../constants';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import taskRouter from './task/task.router';
import { isAuth } from './auth/auth.middleware';

const route = express.Router();

route.use('/users', isAuth, userRouter);
route.use('/tasks', isAuth, taskRouter);
route.use('/auth', authRouter);
route.use('/health', (_req, res) => res.send(httpCode.OK));

export default route;
