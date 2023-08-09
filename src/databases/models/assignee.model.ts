import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  IsUUID,
  AllowNull,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Task } from './task.model';
import { AssigneeAttributes, AssigneeCreationAttributes } from '../../types';

@Table({ timestamps: true, tableName: 'assignees' })
export class Assignee extends Model<
  AssigneeAttributes,
  AssigneeCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Unique
  @Default(Sequelize.UUIDV4)
  @Column(DataType.UUID)
  assigneeId!: string;

  @ForeignKey(() => Task)
  @Column(DataType.UUID)
  taskId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  createdAt?: Date;

  updatedAt?: Date;

  @BelongsTo(() => Task)
  Task?: Task;
}

export default Assignee;
