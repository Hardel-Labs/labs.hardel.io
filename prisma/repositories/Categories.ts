import { Category, Item, PrismaClient } from '@prisma/client';
import { SafeNumber } from '@definitions/global';
import { MinecraftCategoryData } from '@definitions/minecraft';

export type CategoryCreateData = Omit<Category, 'id'> | Category;
type CategoryWithCategories = Array<Category & { items?: Item[] }>;

export default class CategoriesRepository {
    constructor(private readonly prisma: PrismaClient['category']) {}

    async findAll(items?: boolean) {
        return await this.prisma.findMany({
            include: { items: items }
        });
    }

    async findPaginated(limit?: SafeNumber, page?: SafeNumber, items?: boolean) {
        return await this.prisma.findMany({
            include: { items: items },
            take: limit ? Number(limit) : undefined,
            skip: page && limit ? (Number(page) + 1) * Number(limit) : 0
        });
    }

    async findOne(id: number, items?: boolean) {
        return await this.prisma.findUnique({
            where: {
                id
            },
            include: { items: items }
        });
    }

    async connectItem(categoryId: number, itemId: number) {
        return await this.prisma.update({
            where: {
                id: categoryId
            },
            data: {
                items: {
                    connect: {
                        id: itemId
                    }
                }
            }
        });
    }

    async findVanilla(): Promise<MinecraftCategoryData[]> {
        const categories = await this.prisma.findMany({
            include: {
                items: {
                    where: {
                        custom: false
                    },
                    select: {
                        id: true,
                        minecraftId: true,
                        name: true,
                        asset: true,
                        categories: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return categories.map((category) => {
            return {
                id: category.id,
                name: category.name,
                asset: `${process.env.ASSET_PREFIX}/minecraft/items/${category.asset}`,
                items: category.items.map((item) => {
                    return {
                        databaseId: item.id,
                        id: item.minecraftId,
                        name: item.name,
                        image: `${process.env.ASSET_PREFIX}/minecraft/items/${item.asset}`,
                        categories: item.categories?.map((category) => {
                            return {
                                id: category.id,
                                name: category.name
                            };
                        })
                    };
                })
            };
        });
    }

    async count() {
        return await this.prisma.count();
    }

    async create(data: CategoryCreateData) {
        return await this.prisma.create({
            data
        });
    }

    async update(id: number, data: Partial<Item>) {
        return await this.prisma.update({
            where: {
                id
            },
            data
        });
    }

    async updateOrInsert(name: string, asset: string, id?: SafeNumber) {
        const assetUrl = asset.startsWith('minecraft:') ? asset.replace('minecraft:', '') : asset;
        const url = 'vanilla/' + assetUrl + '.webp';

        if (id) {
            return await this.update(+id, { name, asset: url });
        } else {
            return await this.prisma.create({
                data: { name, asset: url }
            });
        }
    }

    async delete(id: number) {
        return await this.prisma.delete({
            where: {
                id
            }
        });
    }

    async deleteAll() {
        return await this.prisma.deleteMany();
    }

    itemsToData(categories: CategoryWithCategories): MinecraftCategoryData[] {
        return categories.map((category) => {
            return {
                id: category.id,
                name: category.name,
                asset: `${process.env.ASSET_PREFIX}/minecraft/items/${category.asset}`,
                items:
                    category?.items?.map((item) => {
                        return {
                            id: item.minecraftId,
                            name: item.name,
                            image: `${process.env.ASSET_PREFIX}/minecraft/items/${item.asset}`
                        };
                    }) ?? []
            };
        });
    }
}
