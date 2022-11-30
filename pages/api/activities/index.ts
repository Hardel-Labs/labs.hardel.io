import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { getAllActivities } from '@libs/request/server/project/activity/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const method = req.method;
    const { projectId } = req.body;
    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
        return;
    }

    switch (method) {
        case 'GET': {
            const data = await getAllActivities(projectId);
            res.status(data.request.statusCode).json(data);
            break;
        }
        default: {
            new RestHelper(req, res).addError(RestErrorType.MethodNotAllowed, 'Method not allowed').checkErrors();
        }
    }
}
