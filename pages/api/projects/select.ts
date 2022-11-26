import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import selectProject from '@libs/request/server/project/select';
import { getSelectedProject } from '@libs/request/server/project/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const method = req.method;
    const { projectId } = req.body;

    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
        return;
    }

    switch (method) {
        case 'POST': {
            const error = new RestHelper(req, res).checkIsVariableIsDefined(projectId, 'projectId').checkErrors();
            if (error) return;

            const data = await selectProject(projectId, userId);
            res.status(data.request.statusCode).json(data);
            break;
        }
        case 'GET': {
            const data = await getSelectedProject(userId);
            res.status(data.request.statusCode).json(data);
            break;
        }
        default: {
            new RestHelper(req, res).addError(RestErrorType.MethodNotAllowed, 'Method not allowed').send();
        }
    }
}
