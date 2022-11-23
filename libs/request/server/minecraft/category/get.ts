import { MinecraftCategoryData } from '@definitions/minecraft';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import CategoriesRepository from '@repositories/Categories';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';

const getCategories = async (): Promise<RestRequest<MinecraftCategoryData[]>> => {
    try {
        const data = await new CategoriesRepository(prisma.category).findVanilla();
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occured while fetching categories.').getResponse();
    }
};

export default getCategories;
