import { Item, Notification, PrismaClient, Project, ProjectRole, ProjectUser, Recipes } from '@prisma/client';
import { SafeNumber } from '@definitions/global';

export type ProjectCreateData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'> | Project;
export type ProjectData = (Project & { items: Item[]; Recipes: Recipes[]; notifications: Notification[]; users: ProjectUser[] }) | Project;

export default class ProjectRepository {
    constructor(private readonly prisma: PrismaClient['project']) {}

    async findAll(include?: boolean): Promise<ProjectData[]> {
        return await this.prisma.findMany({
            include: {
                items: include,
                Recipes: include,
                notifications: include,
                users: include
            }
        });
    }

    async findProjectWithUser(projectId: string) {
        return await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            },
            include: {
                users: true
            }
        });
    }

    async findPaginated(limit?: SafeNumber, page?: SafeNumber, include?: boolean): Promise<ProjectData[]> {
        return await this.prisma.findMany({
            include: {
                items: include,
                Recipes: include,
                notifications: include,
                users: include
            },
            take: limit ? Number(limit) : undefined,
            skip: page && limit ? (Number(page) + 1) * Number(limit) : 0
        });
    }

    async findOne(id: string, include?: boolean): Promise<ProjectData | null> {
        return await this.prisma.findUnique({
            where: { id },
            include: {
                items: include,
                Recipes: include,
                notifications: include,
                users: include
            }
        });
    }

    async findByUserId(userId: string, include?: boolean): Promise<ProjectData[]> {
        return await this.prisma.findMany({
            where: {
                users: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                items: include,
                Recipes: include,
                notifications: include,
                users: include
            }
        });
    }

    async connectItem(projectId: string, itemId: number): Promise<Project> {
        return await this.prisma.update({
            where: {
                id: projectId
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

    async connectRecipe(projectId: string, recipeId: number): Promise<Project> {
        return await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                Recipes: {
                    connect: {
                        id: recipeId
                    }
                }
            }
        });
    }

    async connectUser(projectId: string, userId: string, role: ProjectRole): Promise<Project> {
        return await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    create: {
                        role: role,
                        userId: userId
                    }
                }
            }
        });
    }

    async createNotification(projectId: string, title: string, message: string, asset: string): Promise<Project> {
        return await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                notifications: {
                    create: {
                        title,
                        asset,
                        message
                    }
                }
            }
        });
    }

    async count() {
        return await this.prisma.count();
    }

    async countByUser(userId: string) {
        return await this.prisma.count({
            where: {
                users: {
                    some: {
                        userId
                    }
                }
            }
        });
    }

    async create(userId: string, data: ProjectCreateData): Promise<Project> {
        const user = await this.countByUser(userId);
        if (user >= 10) throw new Error('You can only have 5 projects at a time');

        return await this.prisma.create({
            data: {
                ...data,
                users: {
                    create: {
                        role: 'OWNER',
                        userId
                    }
                }
            }
        });
    }

    async updateUserRole(projectId: string, userId: string, role: ProjectRole): Promise<Project> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to update this project');

        return await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    update: {
                        where: {
                            projectId_userId: {
                                projectId,
                                userId
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            }
        });
    }

    async update(projectId: string, userId: string, data: Partial<Project>): Promise<Project> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to update this project');

        return await this.prisma.update({
            where: {
                id: projectId
            },
            data
        });
    }

    async delete(projectId: string, userId: string): Promise<Project> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to delete this project');

        return await this.prisma.delete({
            where: {
                id: projectId
            }
        });
    }

    async hasPermission(projectId: string, userId: string, role: ProjectRole[]): Promise<boolean> {
        const project = await this.findProjectWithUser(projectId);
        return project.users.some((user) => user.userId === userId && role.includes(user.role));
    }
}
