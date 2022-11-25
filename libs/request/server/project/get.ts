import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import ProjectRepository from '@repositories/Project';
import { ReadablePersonalProjectData, ReadableProject } from '@definitions/project';

const getProjects = async (): Promise<RestRequest<ReadableProject[]>> => {
    try {
        const data = await new ProjectRepository(prisma.project).findAll(false);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occurred while fetching project.').getResponse();
    }
};

const getProjectsAllData = async (): Promise<RestRequest<ReadableProject[]>> => {
    try {
        const data = await new ProjectRepository(prisma.project).findAll(true);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occurred while fetching project.').getResponse();
    }
};

const getOneProject = async (id: string): Promise<RestRequest<ReadableProject>> => {
    try {
        const data = await new ProjectRepository(prisma.project).findOne(id);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occurred while fetching project.').getResponse();
    }
};

const getProjectByUserId = async (userId: string): Promise<RestRequest<ReadablePersonalProjectData[]>> => {
    try {
        const data = await new ProjectRepository(prisma.project).findByUserId(userId);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occurred while fetching project.').getResponse();
    }
};

export { getProjects, getProjectsAllData, getOneProject, getProjectByUserId };
