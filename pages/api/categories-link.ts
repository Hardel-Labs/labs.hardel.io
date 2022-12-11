import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@libs/prisma';

type Data = {
    category: string;
    items: string[];
}[];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // get all items minecraftId from categories
    const data = await prisma.category.findMany({
        select: {
            items: {
                select: {
                    minecraftId: true
                }
            },
            categoryId: true
        }
    });

    const result: Data = data.map((category) => {
        return {
            category: category.categoryId,
            items: category.items.map((item) => item.minecraftId)
        };
    });

    res.status(200).json(result);
}
