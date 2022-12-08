import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import prisma from '@libs/prisma';
import RecipeRepository from '@repositories/Recipe';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const { projectId, recipeId, name } = req.body;
    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
        return;
    }

    const errors = new RestHelper(req, res)
        .checkIsVariableIsDefined(projectId, 'Project ID')
        .checkIsVariableIsDefined(recipeId, 'Recipe ID')
        .checkIsVariableIsDefined(name, 'Name')
        .checkMaxLength(name, 50)
        .checkErrors();
    if (errors) return;

    try {
        const data = await new RecipeRepository(prisma.recipes).updateName(userId, projectId, recipeId, name);
        new RestHelper(req, res).setData(data).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'An error has occurred.').send();
    }
}
