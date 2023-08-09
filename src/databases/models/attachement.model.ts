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
import {
  AttachmentAttributes,
  AttachmentCreationAttributes
} from '../../types';

@Table({ timestamps: true, tableName: 'attachments' })
export class Attachment extends Model<
  AttachmentAttributes,
  AttachmentCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Unique
  @Default(Sequelize.UUIDV4)
  @Column(DataType.UUID)
  attachmentId!: string;

  @AllowNull(false)
  @ForeignKey(() => Task)
  @Column(DataType.UUID)
  taskId!: string;

  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  url!: string;

  createdAt?: Date;

  updatedAt?: Date;

  @BelongsTo(() => Task)
  Task?: Task;
}

export default Attachment;
