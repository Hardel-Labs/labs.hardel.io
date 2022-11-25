import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { MinecraftItemData } from '@definitions/minecraft';
import { RestRequest } from '@definitions/api';
import { Project } from '@prisma/client';
import ProjectRepository from '@repositories/Project';

const updateProject = async (projectId: string, userId: string, data: Partial<Project>): Promise<RestRequest<MinecraftItemData>> => {
    try {
        const project = await new ProjectRepository(prisma.project).update(projectId, userId, data);
        return new RestHelper().setData(project).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'Failed to update project data').getResponse();
    }
};

export default updateProject;
