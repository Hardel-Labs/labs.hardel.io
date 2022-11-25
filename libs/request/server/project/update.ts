import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { RestRequest } from '@definitions/api';
import { Project } from '@prisma/client';
import ProjectRepository from '@repositories/Project';
import { ReadableProject } from '@definitions/project';

const updateProject = async (projectId: string, userId: string, data: Partial<Project>): Promise<RestRequest<ReadableProject>> => {
    try {
        const project = await new ProjectRepository(prisma.project).update(projectId, userId, data);
        return new RestHelper().setData(project).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'Failed to update project data').getResponse();
    }
};

export default updateProject;
