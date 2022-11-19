import prisma from '@libs/prisma';
import ApiResponseParser from '@libs/api-response-parser';
import { RestErrorType } from '@libs/constant';
import { MinecraftCategoryData } from '@definitions/minecraft';
import { RestRequest } from '@definitions/api';

const getCategories = async (): Promise<RestRequest<MinecraftCategoryData[]>> => {
    const apiResponse = new ApiResponseParser<MinecraftCategoryData[]>();
    const categories = await prisma.category.findMany({
        include: {
            items: {
                where: {
                    custom: false
                },
                select: {
                    minecraftId: true,
                    name: true,
                    asset: true
                }
            }
        }
    });

    if (!categories) {
        apiResponse.addError(404, RestErrorType.InternalServerError, 'No categories found or an error occurred');
        return apiResponse.getResponse();
    }

    const data: Array<MinecraftCategoryData> = categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
            asset: `${process.env.ASSET_PREFIX}/minecraft/items/${category.asset}`,
            items: category.items.map((item) => {
                return {
                    id: item.minecraftId,
                    name: item.name,
                    image: `${process.env.ASSET_PREFIX}/minecraft/items/${item.asset}`
                };
            })
        };
    });

    apiResponse.setData(data);
    return apiResponse.getResponse();
};

export default getCategories;
