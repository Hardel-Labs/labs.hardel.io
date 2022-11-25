import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { RestRequest } from '@definitions/api';
import ProjectRepository, { ProjectCreateData } from '@repositories/Project';
import { Project } from '@prisma/client';

const createProject = async (userId: string, data: ProjectCreateData): Promise<RestRequest<Project>> => {
    try {
        const project = await new ProjectRepository(prisma.project).create(userId, data);
        return new RestHelper().setData(project).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'The project is not create').getResponse();
    }
};

export default createProject;