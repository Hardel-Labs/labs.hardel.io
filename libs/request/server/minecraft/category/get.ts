import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import { MinecraftCategoryData } from '@definitions/minecraft';
import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';

const getCategories = async (): Promise<RestRequest<MinecraftCategoryData[]>> => {
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
        return new RestHelper().addError(RestErrorType.InternalServerError, 'No categories found or an error occurred').getResponse();
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

    return new RestHelper().setData(data).getResponse();
};

export default getCategories;
