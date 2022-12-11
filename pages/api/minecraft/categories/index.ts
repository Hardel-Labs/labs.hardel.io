import { NextApiRequest, NextApiResponse } from 'next';
import getCategories from '@libs/request/server/minecraft/category/get';
import { RestRequest } from '@definitions/api';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import upsertCategory from '@libs/request/server/minecraft/category/upsert';
import deleteCategory from '@libs/request/server/minecraft/category/delete';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const method = req.method;
    const { id, asset, name } = req.body;

    if (method !== 'GET') {
        const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
        if (!auth.isAuthenticated || !auth.hasRole) {
            new RestHelper(req, res)
                .addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource')
                .checkErrors();
            return;
        }
    }

    switch (method) {
        case 'GET': {
            const data = await getCategories();
            res.status(data.request.statusCode).json(data);
            break;
        }
        case 'PUT': {
            const errors = new RestHelper(req, res)
                .checkIsVariableIsDefined(asset, 'asset')
                .checkIsVariableIsDefined(name, 'name')
                .checkMaxLength(name, 30)
                .checkErrors();

            if (errors) return;
            const putData = await upsertCategory(id, name, asset);
            res.status(putData.request.statusCode).json(putData);
            break;
        }
        case 'DELETE': {
            const errors = new RestHelper(req, res).checkIsVariableIsDefined(id, 'id').checkErrors();

            if (errors) return;

            const deleteData = await deleteCategory(id);
            res.status(deleteData.request.statusCode).json(deleteData);
            break;
        }
        default: {
            new RestHelper(req, res).addError(RestErrorType.MethodNotAllowed, 'Method not allowed').checkErrors();
        }
    }
}
