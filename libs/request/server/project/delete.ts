import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import ProjectRepository from '@repositories/Project';

const deleteProject = async (projectId: string, userId: string): Promise<RestRequest<any>> => {
    try {
        const data = await new ProjectRepository(prisma.project).delete(projectId, userId);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error has occurred.').getResponse();
    }
};

export default deleteProject;
