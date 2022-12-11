import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { MinecraftItemData } from '@definitions/minecraft';
import { RestRequest } from '@definitions/api';
import CategoriesRepository from '@repositories/Categories';

const upsertCategory = async (id: string, name: string, asset: string): Promise<RestRequest<MinecraftItemData>> => {
    try {
        const data = await new CategoriesRepository(prisma.category).updateOrInsert(name, asset, id);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'The file was not uploaded').getResponse();
    }
};

export default upsertCategory;
