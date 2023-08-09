import {
  projectRepository,
  assigneeRepository,
  attachementRepository
} from '../../databases/sequelize';
import { Project, Assignee, Attachment } from '../../databases/models';
import { omit } from 'lodash';

export class TaskHelper {
  /**
   *
   * @param dto
   * @description update multiple projects
   */
  public updateProjects = async (
    dto: Pick<Project, 'name' | 'projectId' | 'url'>[]
  ): Promise<Project[]> => {
    const updatedProjects: Project[] = [];

    for (const p of dto) {
      const u = await projectRepository.update(p, {
        where: { projectId: p.projectId },
        returning: true
      });

      if (u.length > 1 && u[1]) {
        updatedProjects.push(u[1][0]);
      }
    }

    return updatedProjects;
  };

  /**
   *
   * @param dto
   * @description update multiple assignees
   */
  public updateAssignees = async (
    dto: Pick<Assignee, 'name' | 'assigneeId'>[]
  ): Promise<Assignee[]> => {
    const updatedItems: Assignee[] = [];

    for (const p of dto) {
      const u = await assigneeRepository.update(p, {
        where: { assigneeId: p.assigneeId },
        returning: true
      });

      if (u.length > 1 && u[1]) {
        updatedItems.push(u[1][0]);
      }
    }

    return updatedItems;
  };

  /**
   *
   * @param dto
   * @description update multiple assignees
   */
  public updateAttachment = async (
    dto: Pick<Attachment, 'name' | 'attachmentId' | 'url'>[]
  ): Promise<Attachment[]> => {
    const updatedItems: Attachment[] = [];

    for (const p of dto) {
      const u = await attachementRepository.update(omit(p, ['attachmentId']), {
        where: { attachmentId: p.attachmentId },
        returning: true
      });

      if (u.length > 1 && u[1]) {
        updatedItems.push(u[1][0]);
      }
    }

    return updatedItems;
  };
}
