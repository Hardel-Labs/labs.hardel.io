import { NextApiRequest, NextApiResponse } from 'next';
import { MinecraftCategoryData } from '@definitions/minecraft';
import getCategories from '@libs/request/server/minecraft/category/get';
import { RestRequest } from '@definitions/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<MinecraftCategoryData[]>>) {
    const data = await getCategories();
    res.status(data.request.statusCode).json(data);
}
