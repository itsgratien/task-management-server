import { Optional } from 'sequelize';
import { Project, Assignee, Attachment } from '../databases/models';

export interface TaskAttributes {
  taskId: string;
  title: string;
  userId: string;
  startDate: string;
  endDate: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  projects?: Project[];
  attachments?: Attachment[];
  assignees?: Assignee[];
}

export interface TaskCreationAttributes
  extends Optional<
    TaskAttributes,
    | 'taskId'
    | 'createdAt'
    | 'updatedAt'
    | 'projects'
    | 'assignees'
    | 'attachments'
  > {}

export interface TaskDTO
  extends Pick<TaskAttributes, 'title' | 'startDate' | 'endDate' | 'priority'> {
  attachments: Pick<Attachment, 'name' | 'url'>[];
  assignees: string[];
  projects: Pick<Project, 'name' | 'url'>[];
}

export interface SingleTaskDTOParam {
  taskId: string;
}

export interface UpdateTaskDTO
  extends Pick<TaskDTO, 'title' | 'startDate' | 'endDate' | 'priority'> {
  assignees: Pick<Assignee, 'assigneeId' | 'name'>[];
  projects: Pick<Project, 'name' | 'url' | 'projectId'>[];
  attachments: Pick<Attachment, 'name' | 'url' | 'attachmentId'>[];
}
