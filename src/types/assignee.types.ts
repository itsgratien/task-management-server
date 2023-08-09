import { Optional } from 'sequelize';
import { Task } from '../databases/models';

export interface AssigneeAttributes {
  assigneeId: string;
  taskId: string;
  name: string;
  task?: Task;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssigneeCreationAttributes
  extends Optional<
    AssigneeAttributes,
    'assigneeId' | 'task' | 'createdAt' | 'updatedAt'
  > {}
