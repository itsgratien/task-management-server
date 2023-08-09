import * as dotenv from 'dotenv';
dotenv.config();
import * as http from 'http';
import { sequelize } from './databases/sequelize';
import app from './app';

const server = http.createServer(app);

const port = process.env.PORT ?? 4000;

server.listen(port, async () => {
  await sequelize.sync({ alter: true });
  // eslint-disable-next-line no-console
  console.log(`Server started on PORT ${port}`);
});
