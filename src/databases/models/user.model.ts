import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  IsUUID
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { UserAttributes, UserCreationAttributes } from '../../types/user.types';

@Table({ timestamps: true, tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Unique
  @Default(Sequelize.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @Column(DataType.STRING)
  username!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  createdAt?: Date;

  updatedAt?: Date;
}

export default User;
