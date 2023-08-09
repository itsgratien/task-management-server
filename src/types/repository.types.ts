import { User, Task, Project, Assignee, Attachment } from '../databases/models';
import { Repository } from 'sequelize-typescript';

export type RepositoryType = Repository<
  User | Task | Project | Assignee | Attachment
>;
