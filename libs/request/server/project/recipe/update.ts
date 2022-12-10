import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { RestRequest } from '@definitions/api';
import { ReadableProject } from '@definitions/project';
import RecipeRepository, { CreateRecipeData } from '@repositories/Recipe';

export const updateRecipe = async (
    userId: string,
    projectId: string,
    recipeId: string,
    data: Omit<CreateRecipeData, 'projectId'>
): Promise<RestRequest<ReadableProject>> => {
    try {
        const response = await new RecipeRepository(prisma.recipes).update(userId, projectId, recipeId, data);
        return new RestHelper().setData(response).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'Failed to update recipe').getResponse();
    }
};

export const updateName = async (
    userId: string,
    projectId: string,
    recipeId: string,
    name: string
): Promise<RestRequest<ReadableProject>> => {
    try {
        const response = await new RecipeRepository(prisma.recipes).updateName(userId, projectId, recipeId, name);
        return new RestHelper().setData(response).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'Failed to update recipe').getResponse();
    }
};
