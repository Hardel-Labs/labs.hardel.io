import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { getRecipesFromProject } from '@libs/request/server/project/recipe/get';
import { deleteRecipe } from '@libs/request/server/project/recipe/delete';
import { updateRecipe } from '@libs/request/server/project/recipe/update';
import { createRecipe } from '@libs/request/server/project/recipe/create';
import ProjectRepository from '@repositories/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<any>>) {
    const method = req.method;
    const { recipeId, data } = req.body;
    const userId = await new RestHelper(req, res).getUserId();
    if (!userId) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'User not found').send();
        return;
    }

    const project = await new ProjectRepository(prisma.project).findSelectedProject(userId);
    const errors = new RestHelper(req, res).checkIsVariableIsDefined(project.id, 'projectId').checkErrors();
    if (errors) return;

    switch (method) {
        case 'GET': {
            const data = await getRecipesFromProject(project.id);
            res.status(data.request.statusCode).json(data);
            break;
        }
        case 'DELETE': {
            const errors = new RestHelper(req, res).checkIsVariableIsDefined(recipeId, 'recipeId').checkErrors();
            if (errors) return;

            const data = await deleteRecipe(userId, project.id, recipeId);
            res.status(data.request.statusCode).json(data);
            break;
        }
        case 'POST': {
            const errors = new RestHelper(req, res).checkIsVariableIsDefined(recipeId, 'recipeId').checkIsVariableIsDefined(data, 'data').checkErrors();

            if (errors) return;

            const responses = await updateRecipe(userId, project.id, recipeId, data);
            res.status(responses.request.statusCode).json(responses);
            break;
        }
        case 'PUT': {
            const errors = new RestHelper(req, res).checkIsVariableIsDefined(data, 'data').checkErrors();
            if (errors) return;

            const responses = await createRecipe(userId, project.id, data);
            res.status(responses.request.statusCode).json(responses);
            break;
        }
        default: {
            new RestHelper(req, res).addError(RestErrorType.MethodNotAllowed, 'Method not allowed').checkErrors();
        }
    }
}
