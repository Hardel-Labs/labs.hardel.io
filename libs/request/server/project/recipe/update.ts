import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { RestRequest } from '@definitions/api';
import { ReadableProject } from '@definitions/project';
import RecipeRepository from '@repositories/Recipe';
import { SlotData } from '@definitions/minecraft';

export const updateRecipe = async (userId: string, projectId: string, recipeId: string, ingredients: SlotData[]): Promise<RestRequest<ReadableProject>> => {
    try {
        const data = await new RecipeRepository(prisma.recipes).updateIngredients(userId, projectId, recipeId, ingredients);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'Failed to update recipe').getResponse();
    }
};

export const updateName = async (userId: string, projectId: string, recipeId: string, name: string): Promise<RestRequest<ReadableProject>> => {
    try {
        const data = await new RecipeRepository(prisma.recipes).updateName(userId, projectId, recipeId, name);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'Failed to update recipe').getResponse();
    }
};
