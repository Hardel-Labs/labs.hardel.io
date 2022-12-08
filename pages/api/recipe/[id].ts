import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import prisma from '@libs/prisma';
import RecipeRepository from '@repositories/Recipe';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const id = req.query.id as string;

    try {
        const data = await new RecipeRepository(prisma.recipes).findOne(id);
        new RestHelper(req, res).setData(data).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'An error has occurred.').send();
    }
}
