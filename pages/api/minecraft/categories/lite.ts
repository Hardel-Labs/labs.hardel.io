import { NextApiRequest, NextApiResponse } from 'next';
import CorsMiddleWare from '@libs/request/server/cors-middlewars';
import { RestRequest } from '@definitions/api';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import { Category } from '@prisma/client';
import RestHelper from '@libs/request/server/form-checker';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<Category[]>>) {
    await CorsMiddleWare(req, res, {
        methods: ['GET', 'HEAD'],
        origin: '*'
    });

    const categories = await prisma.category.findMany();
    if (!categories) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'No categories found or an error occurred').checkErrors();
    }

    new RestHelper<Category[]>(req, res).setData(categories).send();
}
