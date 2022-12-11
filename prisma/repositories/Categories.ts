import { Category, Item, PrismaClient } from '@prisma/client';
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

    async connectItem(categoryId: string, itemId: string) {
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
                                name: true,
                                categoryId: true
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
                minecraftId: category.categoryId,
                asset: `${process.env.ASSET_PREFIX}/minecraft/items/vanilla/${category.asset}`,
                items: category.items.map((item) => {
                    return {
                        id: item.id,
                        minecraftId: item.minecraftId,
                        name: item.name,
                        image: `${process.env.ASSET_PREFIX}/minecraft/items/vanilla/${item.asset}`,
                        categories: item.categories?.map((category) => {
                            return {
                                id: category.id,
                                name: category.name,
                                minecraftId: category.categoryId
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

    async update(id: string, data: Partial<Item>) {
        return await this.prisma.update({
            where: {
                id
            },
            data
        });
    }

    async updateOrInsert(name: string, itemId: string, categoryId: string, id?: string) {
        const assetUrl = itemId.startsWith('minecraft:') ? itemId.replace('minecraft:', '') : itemId;
        const url = 'vanilla/' + assetUrl + '.webp';

        if (id) {
            return await this.update(id, { name, asset: url });
        } else {
            return await this.prisma.create({
                data: {
                    name,
                    asset: url,
                    categoryId
                }
            });
        }
    }

    async delete(id: string) {
        return await this.prisma.delete({
            where: {
                id
            }
        });
    }

    categoryToData(categories: CategoryWithCategories): MinecraftCategoryData[] {
        return categories.map((category) => {
            return {
                id: category.id,
                name: category.name,
                minecraftId: category.categoryId,
                asset: `${process.env.ASSET_PREFIX}/minecraft/items/vanilla/${category.asset}`,
                items:
                    category?.items?.map((item) => {
                        return {
                            id: item.id,
                            minecraftId: item.minecraftId,
                            name: item.name,
                            image: `${process.env.ASSET_PREFIX}/minecraft/items/vanilla/${item.asset}`
                        };
                    }) ?? []
            };
        });
    }
}
