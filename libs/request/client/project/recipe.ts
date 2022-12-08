import FastFetcher from '@libs/request/client/fast-fetcher';
import { CreateRecipeData } from '@repositories/Recipe';
import { SlotData } from '@definitions/minecraft';

export const getOneRecipe = async (id: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher(`/api/recipe/${id}`, 'GET').fetching(callback);
};

export const getRecipesFromProject = async (callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/recipe', 'GET').fetching(callback);
};

export const createRecipe = async (data: Omit<CreateRecipeData, 'projectId'>, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/recipe', 'PUT').setBody({ data }).fetching(callback);
};

export const updateProject = async (recipeId: string, data: SlotData[], callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/recipe', 'POST').setBody({ recipeId, data }).fetching(callback);
};

export const updateName = async (recipeId: string, name: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/recipe/name', 'PATCH').setBody({ recipeId, name }).fetching(callback);
};

export const deleteRecipe = async (recipeId: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/recipe', 'DELETE').setBody({ recipeId }).fetching(callback);
};
