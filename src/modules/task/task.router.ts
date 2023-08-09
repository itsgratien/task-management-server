import express from 'express';
import { TaskController } from './task.controller';

const route = express.Router();

const taskCtrl = new TaskController();

/**
 * @description get tasks and create task
 */
route.route('/').get(taskCtrl.getTasks).post(taskCtrl.createTask);

export default route;
