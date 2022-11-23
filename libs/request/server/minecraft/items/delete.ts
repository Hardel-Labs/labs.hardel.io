import { SafeNumber } from '@definitions/global';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import ItemRepository from '@repositories/Items';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';

const deleteItem = async (id: SafeNumber): Promise<RestRequest<any>> => {
    const repo = new ItemRepository(prisma.item);

    try {
        const data = await repo.delete(+id);
        const item = repo.itemToData(data);
        return new RestHelper().setData(item).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error has occurred.').getResponse();
    }
};

export default deleteItem;
