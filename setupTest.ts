import { sequelize } from './src/databases/sequelize';

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});
