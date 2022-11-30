import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { getProjectByUserId } from '@libs/request/server/project/get';
import deleteProject from '@libs/request/server/project/delete';
import createProject from '@libs/request/server/project/create';
import { RestErrorType } from '@libs/constant';
import updateProject from '@libs/request/server/project/update';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const method = req.method;
    const { projectId, name, asset, description, namespace, version } = req.body;
    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
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
