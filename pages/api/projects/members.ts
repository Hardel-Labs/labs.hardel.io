import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import ProjectRepository from '@repositories/Project';
import prisma from '@libs/prisma';
import { MembersData } from '@definitions/project';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<MembersData>>) {
    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
        return;
    }

    try {
        const data = await new ProjectRepository(prisma.project).getMembersData(userId);
        new RestHelper(req, res).setData(data).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'An error has occurred.').send();
    }
}
