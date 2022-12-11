import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import RestHelper from '@libs/request/server/form-checker';
import CategoriesRepository from '@repositories/Categories';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const { categoryId, itemId } = req.body;

    try {
        const errors = new RestHelper()
            .checkIsVariableIsDefined(categoryId, 'categoryId')
            .checkIsVariableIsDefined(itemId, 'itemId')
            .checkIsNumber(categoryId, 'categoryId')
            .checkIsNumber(itemId, 'itemId')
            .checkErrors();

        if (errors) return;

        const data = await new CategoriesRepository(prisma.category).connectItem(categoryId, itemId);
        new RestHelper(req, res).setData(data).send();
    } catch (e) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'No categories found or an error occurred').checkErrors();
    }
}
