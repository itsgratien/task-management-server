import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  reset_password_token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    'id' | 'reset_password_token' | 'createdAt' | 'updatedAt'
  > {}

export interface LoginDTO extends Pick<UserAttributes, 'email' | 'password'> {}
export interface SignupDTO
  extends Pick<UserAttributes, 'email' | 'username' | 'password'> {}
