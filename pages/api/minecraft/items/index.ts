import { NextApiRequest, NextApiResponse } from 'next';
import CorsMiddleWare from '@libs/cors-middlewars';
import { MinecraftItemData } from '@definitions/minecraft';
import getItems from '@libs/request/minecraft/items/get';
import { RestRequest } from '@definitions/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<MinecraftItemData[]>>) {
    await CorsMiddleWare(req, res, {
        methods: ['GET', 'HEAD'],
        origin: '*'
    });

    const limit = req.query.limit as string;
    const page = req.query.page as string;
    const data = await getItems(limit, page);

    res.status(data.request.statusCode).json(data);
}
