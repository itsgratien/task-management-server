import { Request, Response, NextFunction } from 'express';
import { responseWrapper } from '../../helpers';
import { httpCode } from '../../constants';
import { userRepository } from '../../databases/sequelize';
import { SignupDTO } from 'src/types/user.types';
import { Op } from 'sequelize';
import { omit, isEmpty } from 'lodash';
import bcrypt from 'bcryptjs';

export class UserController {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @description get current loggedin user
   */
  public me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findUser = await userRepository.findByPk(req.user.id);
      findUser?.setDataValue('password', undefined as any);

      return responseWrapper({ res, status: httpCode.OK, data: findUser });
    } catch (error) {
      return next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @description edit profile of current loggedin user
   */
  public editProfile = async (
    req: Request<any, any, SignupDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const findUser = await userRepository.findByPk(req.user.id);

      const checkEmail = await userRepository.findOne({
        where: { email: { [Op.ne]: email } }
      });

      if (checkEmail) {
        return responseWrapper({
          res,
          status: httpCode.CONFLICT,
          message: 'email already linked to an account'
        });
      }
      let newPassword = findUser?.password;
      if (!isEmpty(password)) {
        newPassword = bcrypt.hashSync(password, 10);
      }

      await userRepository.update(
        { ...omit(req.body, ['password']), password: newPassword },
        { where: { id: req.user.id } }
      );

      return responseWrapper({
        res,
        status: httpCode.OK,
        message: 'profile updated'
      });
    } catch (error) {
      return next(error);
    }
  };
}
