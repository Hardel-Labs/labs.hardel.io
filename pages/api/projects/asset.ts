import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import formidableParser from '@libs/request/server/formidable-parser';
import formidable from 'formidable';
import ProjectRepository from '@repositories/Project';
import prisma from '@libs/prisma';
import { ProjectRole } from '@prisma/client';
import uploadAsset from '@libs/aws/upload';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);
    const userId = session?.id;
    if (!session || !userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You are not logged in').send();
        return;
    }

    const form = await formidableParser(req);
    const file = form.files.asset as formidable.File;
    const projectId = form.fields.projectId as string;

    if (!file) {
        new RestHelper(req, res).addError(RestErrorType.BadRequest, 'Asset is not defined').send();
        return;
    }

    if (!projectId) {
        new RestHelper(req, res).addError(RestErrorType.BadRequest, 'Project id is not defined').send();
        return;
    }

    const repo = new ProjectRepository(prisma.project);
    const project = await repo.hasPermission(projectId, userId, [ProjectRole.OWNER]);
    if (!project) return;

    const destination = `project/${projectId}`;
    const response = await uploadAsset(destination, file, {
        height: 64,
        width: 64,
        filename: 'icon'
    });
    res.status(response.request.statusCode).json(response);
}

export const config = {
    api: {
        bodyParser: false
    }
};
