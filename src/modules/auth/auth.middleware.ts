import { Request, Response, NextFunction } from 'express';
import { responseWrapper } from '../../helpers/';
import { httpCode, httpMessage } from '../../constants';
import { userRepository } from '../../databases/sequelize';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session.user) {
      return responseWrapper({
        res,
        status: httpCode.UNAUTHORIZED,
        message: httpMessage.UNAUTHORIZED
      });
    }

    const userId = req.session.user.id;

    const check = await userRepository.findByPk(userId);

    if (!check) {
      return responseWrapper({
        res,
        status: httpCode.UNAUTHORIZED,
        message: httpMessage.UNAUTHORIZED
      });
    }

    req.user = req.session.user;

    return next();
  } catch (error) {
    return next(error);
  }
};
