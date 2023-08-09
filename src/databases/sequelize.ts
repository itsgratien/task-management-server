import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import { User, Task, Project, Attachment, Assignee } from './models';

const dbUri: string =
  config.get('node_env') === 'test'
    ? config.get('app.database.testUri')
    : config.get('app.database.uri');

export const sequelize = new Sequelize(dbUri, {
  models: [User, Task, Assignee, Project, Attachment],
  repositoryMode: true
});

export const userRepository = sequelize.getRepository(User);
export const taskRepository = sequelize.getRepository(Task);
export const assigneeRepository = sequelize.getRepository(Assignee);
export const attachementRepository = sequelize.getRepository(Attachment);
export const projectRepository = sequelize.getRepository(Project);
