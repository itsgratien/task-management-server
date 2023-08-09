import 'express-session';
import { IUser } from '../user.types';

declare module 'express-session' {
  interface SessionData {
    user?: IUser;
  }
}
