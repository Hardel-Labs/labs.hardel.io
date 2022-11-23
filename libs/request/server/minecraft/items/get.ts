import ItemRepository from '@repositories/Items';
import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { MinecraftItemData } from '@definitions/minecraft';
import { SafeNumber } from '@definitions/global';
import { RestRequest } from '@definitions/api';

const getItems = async (limit?: SafeNumber, page?: SafeNumber): Promise<RestRequest<MinecraftItemData[]>> => {
    try {
        const repo = new ItemRepository(prisma.item);
        const apiResponse = new RestHelper();
        const total = await repo.count();
        const paginatedData = await repo.findPaginated(limit, page, true);
        const items = repo.itemsToData(paginatedData);

        if (limit && page) {
            apiResponse.setPagination(limit, page, total);
        }

        return apiResponse.setData(items).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'Internal Server Error while fetching data').getResponse();
    }
};

export default getItems;
