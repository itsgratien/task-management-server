import { Optional } from 'sequelize';
import { Task } from '../databases/models';

export interface AttachmentAttributes {
  attachmentId: string;
  taskId: string;
  name?: string;
  url: string;
  task?: Task;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttachmentCreationAttributes
  extends Optional<
    AttachmentAttributes,
    'attachmentId' | 'task' | 'createdAt' | 'updatedAt'
  > {}
