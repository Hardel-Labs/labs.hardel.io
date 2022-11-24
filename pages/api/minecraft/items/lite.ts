import { NextApiRequest, NextApiResponse } from 'next';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import ItemRepository from '@repositories/Items';
import prisma from '@libs/prisma';
import { MinecraftItemData } from '@definitions/minecraft';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<MinecraftItemData[]>>) {
    try {
        const repository = new ItemRepository(prisma.item);
        const items = await repository.findAll(false);
        const data = repository.itemsToData(items);
        new RestHelper(req, res).setData(data).send();
    } catch (e) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Internal server error').checkErrors();
    }
}
