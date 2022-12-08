import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { RestRequest } from '@definitions/api';
import { ReadableProject } from '@definitions/project';
import RecipeRepository, { CreateRecipeData } from '@repositories/Recipe';

export const createRecipe = async (userId: string, projectId: string, recipe: Omit<CreateRecipeData, 'projectId'>): Promise<RestRequest<ReadableProject>> => {
    try {
        const data = await new RecipeRepository(prisma.recipes).create(userId, projectId, { ...recipe, projectId });
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'The recipe could not be created.').getResponse();
    }
};
