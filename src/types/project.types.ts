import { Optional } from 'sequelize';
import { Task } from '../databases/models';

export interface ProjectAttributes {
  projectId: string;
  taskId: string;
  name: string;
  url: string;
  task?: Task;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCreationAttributes
  extends Optional<
    ProjectAttributes,
    'projectId' | 'task' | 'createdAt' | 'updatedAt'
  > {}
