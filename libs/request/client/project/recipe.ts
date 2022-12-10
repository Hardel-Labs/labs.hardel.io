import FastFetcher from '@libs/request/client/fast-fetcher';
import { CreateRecipeData } from '@repositories/Recipe';

export const getOneRecipe = async (id: string) => {
    return await new FastFetcher(`/api/recipe/${id}`, 'GET').fetching();
};

export const getRecipesFromProject = async () => {
    return await new FastFetcher('/api/recipe', 'GET').fetching();
};

export const createRecipe = async (data: Omit<CreateRecipeData, 'projectId'>) => {
    return await new FastFetcher('/api/recipe', 'PUT').setBody({ data }).fetching();
};

export const updateRecipe = async (recipeId: string, data: Omit<CreateRecipeData, 'projectId'>) => {
    return await new FastFetcher('/api/recipe', 'POST').setBody({ recipeId, data }).fetching();
};

export const updateName = async (recipeId: string, name: string) => {
    return await new FastFetcher('/api/recipe/name', 'PATCH').setBody({ recipeId, name }).fetching();
};

export const deleteRecipe = async (recipeId: string) => {
    return await new FastFetcher('/api/recipe', 'DELETE').setBody({ recipeId }).fetching();
};
