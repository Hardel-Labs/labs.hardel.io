import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import ProjectRepository from '@repositories/Project';
import { ReadableProject } from '@definitions/project';

const selectProject = async (projectId: string, userId: string): Promise<RestRequest<ReadableProject>> => {
    try {
        const data = await new ProjectRepository(prisma.project).selectProject(projectId, userId);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error has occurred.').getResponse();
    }
};

export default selectProject;
