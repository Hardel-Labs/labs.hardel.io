import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import ProjectRepository from '@repositories/Project';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const { projectId } = req.body;

    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
        return;
    }

    const errors = new RestHelper(req, res).checkIsVariableIsDefined(projectId, 'Project ID').checkErrors();
    if (errors) return;

    try {
        const data = await new ProjectRepository(prisma.project).acceptInvite(projectId, userId);
        new RestHelper(req, res).setData(data).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'An error has occurred.').send();
    }
}
