import ItemRepository, { ItemUpsertData } from '@repositories/Items';
import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { MinecraftItemData } from '@definitions/minecraft';
import { RestRequest } from '@definitions/api';

const upsertItems = async (
    update: boolean,
    id: string,
    minecraftId: string,
    name: string,
    categories: string[],
    tag?: string
): Promise<RestRequest<MinecraftItemData>> => {
    const repo = new ItemRepository(prisma.item);
    const asset = `${minecraftId.split(':')[1]}.webp`;

    if (update && !id) {
        return new RestHelper().addError(RestErrorType.BadRequest, 'You try to update but Missing id').getResponse();
    }

    const data: ItemUpsertData = { id, name, tag, minecraftId, asset, categories };
    try {
        const item = await repo.updateOrInsert(data);
        const insertedItem = repo.itemToData(item);
        return new RestHelper().setData(insertedItem).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'The file was not uploaded').getResponse();
    }
};

export default upsertItems;
