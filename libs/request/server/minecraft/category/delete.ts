import { SafeNumber } from '@definitions/global';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import CategoriesRepository from '@repositories/Categories';

const deleteCategory = async (id: SafeNumber): Promise<RestRequest<any>> => {
    try {
        const data = await new CategoriesRepository(prisma.category).delete(+id);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error has occurred.').getResponse();
    }
};

export default deleteCategory;
