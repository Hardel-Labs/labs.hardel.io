import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import selectProject from '@libs/request/server/project/select';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const { projectId } = req.body;
    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
        return;
    }

    const data = await selectProject(userId, projectId);
    res.status(data.request.statusCode).json(data);
}
