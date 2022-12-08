import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import { ReadableProject } from '@definitions/project';
import RecipeRepository from '@repositories/Recipe';

export const deleteRecipe = async (userId: string, projectId: string, id: string): Promise<RestRequest<ReadableProject>> => {
    try {
        const data = await new RecipeRepository(prisma.recipes).delete(userId, projectId, id);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error has occurred.').getResponse();
    }
};
