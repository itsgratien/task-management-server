import { Request, Response, NextFunction } from 'express';
import { responseWrapper } from '../../helpers';
import { httpCode } from '../../constants';
import { userRepository } from '../../databases/sequelize';
import { LoginDTO, SignupDTO } from '../../types/user.types';
import bcrypt from 'bcryptjs';

export class AuthController {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @description login
   */
  public login = async (
    req: Request<any, any, LoginDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const find = await userRepository.findOne({ where: { email } });

      if (!find) {
        return responseWrapper({
          res,
          status: httpCode.UNAUTHORIZED,
          message: 'Wrong credentials'
        });
      }

      const comparePassword = bcrypt.compareSync(password, find.password);

      if (!comparePassword) {
        return responseWrapper({
          res,
          status: httpCode.UNAUTHORIZED,
          message: 'Wrong credentials'
        });
      }

      find.setDataValue('password', undefined as any);

      req.session.user = find;

      return responseWrapper({
        res,
        status: httpCode.OK,
        message: 'loggedin successful'
      });
    } catch (error) {
      return next(error);
    }
  };

  public signup = async (
    req: Request<any, any, SignupDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, email, password } = req.body;

      const checkEmail = await userRepository.findOne({ where: { email } });

      if (checkEmail) {
        return responseWrapper({
          res,
          status: httpCode.CONFLICT,
          message: 'email already linked to an account'
        });
      }

      const checkUsername = await userRepository.findOne({
        where: { username }
      });

      if (checkUsername) {
        return responseWrapper({
          res,
          status: httpCode.CONFLICT,
          message: 'username already linked to an account'
        });
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      await userRepository.create({ email, password: hashPassword, username });

      return responseWrapper({
        res,
        status: httpCode.OK,
        message: 'your account was created successful'
      });
    } catch (error) {
      return next(error);
    }
  };
}
