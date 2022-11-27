import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { getProjectByUserId } from '@libs/request/server/project/get';
import deleteProject from '@libs/request/server/project/delete';
import createProject from '@libs/request/server/project/create';
import { RestErrorType } from '@libs/constant';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import updateProject from '@libs/request/server/project/update';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const method = req.method;
    const { projectId, name, asset, description, namespace, version } = req.body;
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You are not logged in').send();
        return;
    }

    const userId = session.id;
    const errors = new RestHelper(req, res).checkIsVariableIsDefined(userId, 'id').checkErrors();
    if (errors) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You are not logged in').send();
        return;
    }

    switch (method) {
        case 'GET': {
            const data = await getProjectByUserId(userId);
            res.status(data.request.statusCode).json(data);
            break;
        }
        case 'DELETE': {
            const errors = new RestHelper(req, res).checkIsVariableIsDefined(projectId, 'projectId').checkErrors();
            if (errors) return;

            const data = await deleteProject(projectId, userId);
            res.status(data.request.statusCode).json(data);
            break;
        }
        case 'POST': {
            const errors = new RestHelper(req, res)
                .checkIsVariableIsDefined(projectId, 'projectId')
                .checkMaxLength(name, 50)
                .checkMaxLength(description, 255)
                .checkMaxLength(namespace, 50)
                .checkMaxLength(version, 10)
                .checkErrors();

            if (errors) return;

            const data = await updateProject(projectId, userId, {
                name,
                asset,
                description,
                version,
                namespace
            });

            res.status(data.request.statusCode).json(data);
            break;
        }
        case 'PUT': {
            const errors = new RestHelper(req, res)
                .checkIsVariableIsDefined(name, 'name')
                .checkIsVariableIsDefined(description, 'description')
                .checkIsVariableIsDefined(namespace, 'namespace')
                .checkIsVariableIsDefined(version, 'version')
                .checkMaxLength(name, 50)
                .checkMaxLength(description, 255)
                .checkMaxLength(namespace, 50)
                .checkMaxLength(version, 10)
                .checkErrors();

            if (errors) return;

            const data = await createProject(userId, { name, description, version, namespace });
            res.status(data.request.statusCode).json(data);
            break;
        }
        default: {
            new RestHelper(req, res).addError(RestErrorType.MethodNotAllowed, 'Method not allowed').checkErrors();
        }
    }
}
