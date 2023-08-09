import { Joi, celebrate, Segments } from 'celebrate';
import { TaskPriority } from '../../constants';

export const createTaskValidation = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().required().iso(),
    endDate: Joi.date().required().iso().greater(Joi.ref('startDate')),
    description: Joi.string().required(),
    priority: Joi.string()
      .required()
      .valid(...Object.values(TaskPriority)),
    projects: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required().allow('', null)
      })
    ),
    assignees: Joi.array().items(Joi.string().required()),
    attachments: Joi.array().items(
      Joi.object({
        url: Joi.string().uri().required(),
        name: Joi.string().allow('', null)
      })
    )
  })
});

export const updateTaskValidation = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().required().iso(),
    endDate: Joi.date().required().iso().greater(Joi.ref('startDate')),
    description: Joi.string().required(),
    priority: Joi.string()
      .required()
      .valid(...Object.values(TaskPriority)),
    projects: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required().allow('', null),
        projectId: Joi.string().required()
      })
    ),

    assignees: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        assigneeId: Joi.string().required()
      })
    ),
    attachments: Joi.array().items(
      Joi.object({
        url: Joi.string().uri().required(),
        name: Joi.string().allow('', null),
        attachmentId: Joi.string().required()
      })
    )
  })
});
