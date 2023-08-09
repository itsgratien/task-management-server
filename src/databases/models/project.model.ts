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
import { ProjectAttributes, ProjectCreationAttributes } from '../../types';

@Table({ timestamps: true, tableName: 'projects' })
export class Project extends Model<
  ProjectAttributes,
  ProjectCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Unique
  @Default(Sequelize.UUIDV4)
  @Column(DataType.UUID)
  projectId!: string;

  @AllowNull(false)
  @ForeignKey(() => Task)
  @Column(DataType.UUID)
  taskId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  url!: string;

  createdAt?: Date;

  updatedAt?: Date;

  @BelongsTo(() => Task)
  Task?: Task;
}

export default Project;
