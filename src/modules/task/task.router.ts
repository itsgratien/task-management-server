import express from 'express';
import { TaskController } from './task.controller';
import * as validation from './task.validation';

const route = express.Router();

const taskCtrl = new TaskController();

/**
 * @description get tasks and create task
 */
route
  .route('/')
  .get(taskCtrl.getTasks)
  .post(validation.createTaskValidation, taskCtrl.createTask);
route
  .route('/:taskId')
  .get(taskCtrl.getSingleTask)
  .delete(taskCtrl.deleteTask)
  .put(validation.updateTaskValidation, taskCtrl.updateTask);

export default route;
