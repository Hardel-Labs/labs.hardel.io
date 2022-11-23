import { NextApiRequest, NextApiResponse } from 'next';
import { MinecraftItemData } from '@definitions/minecraft';
import getItems from '@libs/request/server/minecraft/items/get';
import { RestRequest } from '@definitions/api';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import upsertItems from '@libs/request/server/minecraft/items/upsert';
import deleteItem from '@libs/request/server/minecraft/items/delete';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<MinecraftItemData[] | MinecraftItemData>>) {
    const method = req.method;
    const { id, minecraftId, name, tag, categories } = req.body;

    if (method !== 'GET') {
        const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
        if (!auth.isAuthenticated || !auth.hasRole) {
            new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource').checkErrors();
            return;
        }
    }

    if (method === 'GET') {
        const limit = req.query.limit as string;
        const page = req.query.page as string;
        const data = await getItems(limit, page);

        res.status(data.request.statusCode).json(data);
    } else if (method === 'PUT') {
        const errors = new RestHelper(req, res)
            .checkIsVariableIsDefined(minecraftId, 'minecraftId')
            .checkIsVariableIsDefined(name, 'name')
            .checkIsVariableIsDefined(categories, 'categories')
            .checkMaxLength(minecraftId, 80)
            .checkMaxLength(name, 80)
            .isCorrectMinecraftId(minecraftId)
            .isArray(categories)
            .checkErrors();

        if (errors) return;

        const parsedCategories = JSON.parse(categories) as number[];
        const data = await upsertItems(id, minecraftId, name, parsedCategories, tag);
        res.status(data.request.statusCode).json(data);
    } else if (method === 'DELETE') {
        const errors = new RestHelper(req, res).checkIsVariableIsDefined(id, 'id').checkIsNumber(id, 'id').checkErrors();
        if (errors) return;

        const data = await deleteItem(id);
        res.status(data.request.statusCode).json(data);
    }

    new RestHelper(req, res).addError(RestErrorType.MethodNotAllowed, 'Method not allowed').checkErrors();
}
