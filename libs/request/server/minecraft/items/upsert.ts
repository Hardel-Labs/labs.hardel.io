import ItemRepository, { ItemUpsertData } from '@repositories/Items';
import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import { MinecraftItemData } from '@definitions/minecraft';
import { SafeNumber } from '@definitions/global';
import { RestRequest } from '@definitions/api';

const upsertItems = async (id: SafeNumber, minecraftId: string, name: string, categories: number[], tag?: string): Promise<RestRequest<MinecraftItemData>> => {
    const repo = new ItemRepository(prisma.item);
    const data: ItemUpsertData = {
        id: id ? +id : undefined,
        name,
        tag,
        minecraftId,
        asset: `vanilla/${minecraftId.split(':')[1]}.webp`,
        categories: { connect: categories.map((id) => ({ id })) }
    };

    try {
        const item = await repo.updateOrInsert(data);
        const insertedItem = repo.itemToData(item);
        return new RestHelper().setData(insertedItem).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'The file was not uploaded').getResponse();
    }
};

export default upsertItems;
