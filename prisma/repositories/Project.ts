import { Item, Notification, PrismaClient, Project, ProjectRole, ProjectUser, Recipes } from '@prisma/client';
import { SafeNumber } from '@definitions/global';
import { PersonalProjectData, ReadablePersonalProjectData, ReadableProject, ReadableProjectData } from '@definitions/project';
import ItemRepository from '@repositories/Items';
import prisma from '@libs/prisma';

export type ProjectCreateData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'> | Project;
export type ProjectData = Project & { items?: Item[]; recipes?: Recipes[]; notifications?: Notification[]; users?: ProjectUser[] };

export default class ProjectRepository {
    constructor(private readonly prisma: PrismaClient['project']) {}

    async findAll(include?: boolean): Promise<ReadableProject[]> {
        const responses = await this.prisma.findMany({
            include: {
                items: include,
                Recipes: include,
                notifications: include,
                users: include
            }
        });

        return this.projectsToReadableData(responses);
    }

    async findPaginated(limit?: SafeNumber, page?: SafeNumber, include?: boolean): Promise<ReadableProject[]> {
        const responses = await this.prisma.findMany({
            include: {
                items: include,
                Recipes: include,
                notifications: include,
                users: include
            },
            take: limit ? Number(limit) : undefined,
            skip: page && limit ? (Number(page) + 1) * Number(limit) : 0
        });

        return this.projectsToReadableData(responses);
    }

    async findOne(id: string, include?: boolean): Promise<ReadableProject> {
        const responses = await this.prisma.findUniqueOrThrow({
            where: { id },
            include: {
                items: include,
                Recipes: include,
                notifications: include,
                users: include
            }
        });

        return this.projectToReadableData(responses);
    }

    async findByUserId(userId: string, include?: boolean): Promise<ReadablePersonalProjectData[]> {
        const responses = await this.prisma.findMany({
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
                users: true
            }
        });

        return this.projectsToReadablePersonalData(responses, userId);
    }

    async selectProject(projectId: string, userId: string): Promise<ReadableProject> {
        await prisma.projectUser.updateMany({
            where: {
                userId
            },
            data: {
                isSelected: false
            }
        });

        await prisma.projectUser.update({
            where: {
                projectId_userId: {
                    projectId,
                    userId
                }
            },
            data: {
                isSelected: true
            }
        });

        const response = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            }
        });

        return this.projectToReadableData(response);
    }

    async findSelectedProject(userId: string): Promise<ReadablePersonalProjectData> {
        const response = await this.prisma.findFirstOrThrow({
            where: {
                users: {
                    some: {
                        userId,
                        isSelected: true
                    }
                }
            },
            include: {
                users: true
            }
        });

        return this.projectToReadablePersonalData(response, userId);
    }

    async sessionProject(userId: string): Promise<ReadablePersonalProjectData | null> {
        const response = await this.prisma.findFirst({
            where: {
                users: {
                    some: {
                        userId,
                        isSelected: true
                    }
                }
            },
            include: {
                users: true
            }
        });

        if (!response) {
            return null;
        }

        return this.projectToReadablePersonalData(response, userId);
    }

    async connectItem(projectId: string, itemId: number): Promise<ReadableProject> {
        const responses = await this.prisma.update({
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

        return this.projectToReadableData(responses);
    }

    async connectRecipe(projectId: string, recipeId: number): Promise<ReadableProject> {
        const responses = await this.prisma.update({
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

        return this.projectToReadableData(responses);
    }

    async connectUser(projectId: string, userId: string, role: ProjectRole): Promise<ReadableProject> {
        const responses = await this.prisma.update({
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

        return this.projectToReadableData(responses);
    }

    async createNotification(projectId: string, title: string, message: string, asset: string): Promise<ReadableProject> {
        const responses = await this.prisma.update({
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

        return this.projectToReadableData(responses);
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

    async create(userId: string, data: Omit<ProjectCreateData, 'asset'>): Promise<ReadableProject> {
        const user = await this.countByUser(userId);
        if (user >= 10) throw new Error('You can only have 10 projects at a time');

        const project = await this.prisma.create({
            data: {
                ...data,
                asset: '',
                users: {
                    create: {
                        role: 'OWNER',
                        userId
                    }
                }
            }
        });

        const projectId = project.id;
        const asset = `project/${projectId}/icon.webp`;
        await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                asset
            }
        });

        return this.projectToReadableData({ ...project, asset });
    }

    async updateUserRole(projectId: string, userId: string, role: ProjectRole): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to update this project');

        const response = await this.prisma.update({
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

        return this.projectToReadableData(response);
    }

    async update(projectId: string, userId: string, data: Partial<Project>): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to update this project');

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data
        });

        return this.projectToReadableData(response);
    }

    async delete(projectId: string, userId: string): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to delete this project');

        const response = await this.prisma.delete({
            where: {
                id: projectId
            }
        });

        return this.projectToReadableData(response);
    }

    async hasPermission(projectId: string, userId: string, role: ProjectRole[]): Promise<boolean> {
        const project = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            },
            include: {
                users: true
            }
        });

        return project.users.some((user) => user.userId === userId && role.includes(user.role));
    }

    /**
     * Transforms "ProjectUser" to readable data usable by the client
     * @param userData
     */
    private projectToPersonalData(userData: ProjectUser): PersonalProjectData {
        return {
            role: userData.role,
            joinedAt: userData.createdAt,
            isSelected: userData.isSelected,
            userId: userData.userId
        };
    }

    /**
     * Transforms "Project" to readable data usable by the client
     * Include a full and correct asset url
     * And also include correct Item data using MinecraftItemData type.
     * @param project
     */
    private projectToReadableProjectData(project: ProjectData): ReadableProjectData {
        return {
            ...project,
            asset: `${process.env.ASSET_PREFIX}/${project.asset}`,
            items: new ItemRepository(prisma.item).itemsToData(project?.items ?? []),
            recipes: project?.recipes ?? [],
            notifications: project?.notifications ?? []
        };
    }

    /**
     * Transforms multiple generic project into a readable project
     * Includes all users and their roles of the project
     * Include readable asset url.
     * @param projects
     */
    projectsToReadableData(projects: ProjectData[]): ReadableProject[] {
        return projects.map((project) => this.projectToReadableData(project));
    }

    /**
     * Transforms a generic project into a readable project
     * Includes all users and their roles of the project
     * Include readable asset url.
     * @param project
     */
    projectToReadableData(project: ProjectData): ReadableProject {
        const readableProjectData = this.projectToReadableProjectData(project);
        const personals = project.users?.map((user) => this.projectToPersonalData(user));

        return {
            ...readableProjectData,
            users: personals ?? []
        };
    }

    /**
     * Transforms multiples "Project" and UserData to readable data usable by the client
     * Project Data and User Data are merged together
     * @param projects
     * @param userId
     */
    projectsToReadablePersonalData(projects: ProjectData[], userId: string): ReadablePersonalProjectData[] {
        return projects.map((project) => this.projectToReadablePersonalData(project, userId));
    }

    /**
     * Transforms only one "Project" and UserData to readable data usable by the client
     * Project Data and User Data are merged together
     * @param project
     * @param userId
     */
    projectToReadablePersonalData(project: ProjectData, userId: string): ReadablePersonalProjectData {
        const userData = project.users?.find((user) => user.userId === userId);
        if (!userData) throw new Error('User not found in project');

        const projectData = this.projectToReadableProjectData(project);
        const personalData = this.projectToPersonalData(userData);
        return {
            ...projectData,
            ...personalData
        };
    }
}
