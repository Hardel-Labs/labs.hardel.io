import prisma from '@libs/prisma';
import ApiResponseParser from '@libs/api-response-parser';
import { RestErrorType } from '@libs/constant';
import { MinecraftItemData } from '@definitions/minecraft';
import { SafeNumber } from '@definitions/global';
import { RestRequest } from '@definitions/api';

const getItems = async (limit?: SafeNumber, page?: SafeNumber): Promise<RestRequest<MinecraftItemData[]>> => {
    const total = (await prisma.item.count()) ?? 0;
    const apiResponse = new ApiResponseParser<MinecraftItemData[]>(limit, page, total);
    if (apiResponse.hasError) {
        return apiResponse.getResponse();
    }

    const items = await prisma.item.findMany({
        include: { categories: true },
        take: limit ? Number(limit) : undefined,
        skip: page && limit ? (Number(page) + 1) * Number(limit) : 0
    });

    if (!items) {
        apiResponse.addError(404, RestErrorType.InternalServerError, 'No items found or an error occurred');
        return apiResponse.getResponse();
    }

    const data: MinecraftItemData[] = items.map((item) => {
        return {
            id: item.minecraftId,
            name: item.name,
            image: `${process.env.ASSET_PREFIX}/minecraft/items/${item.asset}`,
            custom: item.custom,
            tag: item.tag,
            categories: item.categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    asset: `${process.env.ASSET_PREFIX}/minecraft/categories/${category.asset}`
                };
            })
        };
    });

    apiResponse.setData(data);
    return apiResponse.getResponse();
};

export default getItems;
