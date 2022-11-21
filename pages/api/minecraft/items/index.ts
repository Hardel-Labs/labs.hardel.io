import { NextApiRequest, NextApiResponse } from 'next';
import CorsMiddleWare from '@libs/request/server/cors-middlewars';
import { MinecraftItemData } from '@definitions/minecraft';
import getItems from '@libs/request/server/minecraft/items/get';
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
