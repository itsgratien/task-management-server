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
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { TaskAttributes, TaskCreationAttributes } from '../../types';
import { User, Project, Assignee, Attachment } from '.';

@Table({ timestamps: true, tableName: 'tasks' })
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Unique
  @Default(Sequelize.UUIDV4)
  @Column(DataType.UUID)
  taskId!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  startDate!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  endDate!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  priority!: string;

  createdAt?: Date;

  updatedAt?: Date;

  @BelongsTo(() => User)
  owner?: User;

  @HasMany(() => Project)
  projects?: Project[];

  @HasMany(() => Assignee)
  assignees?: Assignee[];

  @HasMany(() => Attachment)
  attachments?: Attachment[];
}

export default Task;
