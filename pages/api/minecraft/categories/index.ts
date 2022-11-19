import { NextApiRequest, NextApiResponse } from 'next';
import CorsMiddleWare from '@libs/cors-middlewars';
import { MinecraftCategoryData } from '@definitions/minecraft';
import getCategories from '@libs/request/minecraft/category/get';
import { RestRequest } from '@definitions/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<MinecraftCategoryData[]>>) {
    await CorsMiddleWare(req, res, {
        methods: ['GET', 'HEAD'],
        origin: '*'
    });

    const data = await getCategories();
    res.status(data.request.statusCode).json(data);
}
