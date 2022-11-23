import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import { Category } from '@prisma/client';
import RestHelper from '@libs/request/server/form-checker';
import CategoriesRepository from '@repositories/Categories';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<Category[]>>) {
    try {
        const categories = await new CategoriesRepository(prisma.category).findAll(false);
        new RestHelper<Category[]>(req, res).setData(categories).send();
    } catch (e) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'No categories found or an error occurred').checkErrors();
    }
}
