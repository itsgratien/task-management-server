import { Request, Response, NextFunction } from 'express';
import { responseWrapper } from '../../helpers';
import { httpCode } from '../../constants';
import {
  taskRepository,
  projectRepository,
  assigneeRepository,
  attachementRepository
} from '../../databases/sequelize';
import { TaskDTO, SingleTaskDTOParam, UpdateTaskDTO } from '../../types';
import { omit } from 'lodash';
import { Op } from 'sequelize';
import { TaskHelper } from './task.helper';

export class TaskController {
  private taskHelper: TaskHelper;

  constructor() {
    this.taskHelper = new TaskHelper();
  }
  /**
   *
   * @param req
   * @param res
   * @param next
   * @description edit profile of current loggedin user
   */
  public createTask = async (
    req: Request<any, any, TaskDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const setup = await taskRepository.create({
        ...omit(req.body, ['projects', 'attachments', 'assignees']),
        userId: req.user.id,
        startDate: new Date(req.body.startDate).toDateString(),
        endDate: new Date(req.body.endDate).toDateString()
      });

      // push projects into projects table
      await projectRepository.bulkCreate(
        req.body.projects.map((item) => ({ ...item, taskId: setup.taskId }))
      );

      // push assignees into assignees table
      await assigneeRepository.bulkCreate(
        req.body.assignees.map((item) => ({ name: item, taskId: setup.taskId }))
      );

      // push attachments into attachments table
      await attachementRepository.bulkCreate(
        req.body.attachments.map((item) => ({ ...item, taskId: setup.taskId }))
      );

      return responseWrapper({
        res,
        status: httpCode.OK,
        message: 'task saved successful'
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @description view tasks of logged in user
   */
  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await taskRepository.findAll({
        where: { userId: req.user.id },
        include: [
          { model: projectRepository },
          { model: assigneeRepository },
          { model: attachementRepository }
        ]
      });

      return responseWrapper({
        res,
        status: httpCode.OK,
        data: find
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @description view single task of logged in user
   */
  public getSingleTask = async (
    req: Request<SingleTaskDTOParam>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const find = await taskRepository.findOne({
        where: {
          [Op.and]: [{ userId: req.user.id }, { taskId: req.params.taskId }]
        },
        include: [
          { model: projectRepository },
          { model: assigneeRepository },
          { model: attachementRepository }
        ]
      });

      if (!find) {
        return responseWrapper({
          res,
          status: httpCode.NOT_FOUND,
          message: 'Task not found'
        });
      }

      return responseWrapper({
        res,
        status: httpCode.OK,
        data: find
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @description view single task of logged in user
   */
  public deleteTask = async (
    req: Request<SingleTaskDTOParam>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const find = await taskRepository.findOne({
        where: {
          [Op.and]: [{ userId: req.user.id }, { taskId: req.params.taskId }]
        }
      });

      if (!find) {
        return responseWrapper({
          res,
          status: httpCode.NOT_FOUND,
          message: 'Task not found'
        });
      }

      await taskRepository.destroy({ where: { taskId: req.params.taskId } });

      return responseWrapper({
        res,
        status: httpCode.OK,
        message: 'Deleted successful'
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @update single tasks
   */
  public updateTask = async (
    req: Request<SingleTaskDTOParam, any, UpdateTaskDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const find = await taskRepository.findByPk(req.params.taskId);

      if (!find) {
        return responseWrapper({
          res,
          status: httpCode.NOT_FOUND,
          message: 'Task not found'
        });
      }

      await taskRepository.update(
        {
          ...omit(req.body, ['projects', 'attachments', 'assignees']),
          startDate: new Date(req.body.startDate).toDateString(),
          endDate: new Date(req.body.endDate).toDateString()
        },
        {
          where: {
            [Op.and]: [{ taskId: req.params.taskId }, { userId: req.user.id }]
          }
        }
      );

      // update projects
      await this.taskHelper.updateProjects(req.body.projects);

      // update attachment
      await this.taskHelper.updateAttachment(req.body.attachments);

      // update assignees
      await this.taskHelper.updateAssignees(req.body.assignees);

      return responseWrapper({
        res,
        status: httpCode.OK,
        message: 'updated successful'
      });
    } catch (error) {
      return next(error);
    }
  };
}
