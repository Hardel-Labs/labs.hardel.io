import { NextApiRequest, NextApiResponse } from 'next';
import CorsMiddleWare from '@libs/cors-middlewars';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await CorsMiddleWare(req, res, {
        methods: ['GET', 'HEAD'],
        origin: '*'
    });

    const categories = await prisma.category.findMany({
        include: { items: true }
    });

    res.status(200).json(categories);
}
