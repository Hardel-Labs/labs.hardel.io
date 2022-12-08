import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import RecipeRepository from '@repositories/Recipe';
import { ReadableRecipeData } from '@definitions/minecraft';

export const getOneRecipe = async (id: string): Promise<RestRequest<ReadableRecipeData>> => {
    try {
        const data = await new RecipeRepository(prisma.recipes).findOne(id);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occurred while fetching recipe.').getResponse();
    }
};

export const getRecipesFromProject = async (projectId: string): Promise<RestRequest<ReadableRecipeData[]>> => {
    try {
        const data = await new RecipeRepository(prisma.recipes).findByProject(projectId);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occurred while fetching project.').getResponse();
    }
};
