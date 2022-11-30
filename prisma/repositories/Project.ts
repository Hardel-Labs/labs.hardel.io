import { Activity, ActivityType, Item, PrismaClient, Project, ProjectRole, ProjectUser, Recipes } from '@prisma/client';
import { SafeNumber } from '@definitions/global';
import { MembersData, PersonalProjectData, ReadablePersonalProjectData, ReadableProject, ReadableProjectData } from '@definitions/project';
import ItemRepository from '@repositories/Items';
import prisma from '@libs/prisma';
import createActivity from '@libs/request/server/project/activity/create';

export type ProjectCreateData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'> | Project;
export type ProjectData = Project & { items?: Item[]; recipes?: Recipes[]; activities?: Activity[]; users?: ProjectUser[] };

export default class ProjectRepository {
    constructor(private readonly prisma: PrismaClient['project']) {}

    /**
     * Get all projects.
     * @param include
     */
    async findAll(include?: boolean): Promise<ReadableProject[]> {
        const responses = await this.prisma.findMany({
            include: {
                items: include,
                Recipes: include,
                users: include,
                activities: include
            }
        });

        return this.projectsToReadableData(responses);
    }

    /**
     * Get all project with pagination.
     * @param limit
     * @param page
     * @param include
     */
    async findPaginated(limit?: SafeNumber, page?: SafeNumber, include?: boolean): Promise<ReadableProject[]> {
        const responses = await this.prisma.findMany({
            include: {
                items: include,
                Recipes: include,
                activities: include,
                users: include
            },
            take: limit ? Number(limit) : undefined,
            skip: page && limit ? (Number(page) + 1) * Number(limit) : 0
        });

        return this.projectsToReadableData(responses);
    }

    /**
     * Get project by id.
     * @param id
     * @param include
     */
    async findOne(id: string, include?: boolean): Promise<ReadableProject> {
        const responses = await this.prisma.findUniqueOrThrow({
            where: { id },
            include: {
                items: include,
                Recipes: include,
                activities: include,
                users: include
            }
        });

        return this.projectToReadableData(responses);
    }

    /**
     * Get all project from a specific user.
     * @param userId
     * @param include
     */
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
                activities: include,
                users: true
            }
        });

        return this.projectsToReadablePersonalData(responses, userId);
    }

    /**
     * Update the selected project of a user.
     * @param projectId
     * @param userId
     */
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

    /**
     * Get the selected project of a user.
     * @param userId
     */
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

    /**
     * This function is used to store project data in the authentification session.
     * @param userId
     */
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

    /**
     * Return the number of projects.
     */
    async count() {
        return await this.prisma.count();
    }

    /**
     * Return the number of projects of a user.
     * @param userId
     */
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

    /**
     * Create a new project.
     * Limitation: 10 projects per user.
     * @param userId
     * @param data
     */
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

        createActivity(userId, projectId, '%user% created the project %project%', ActivityType.CREATE);
        return this.projectToReadableData({ ...project, asset });
    }

    /**
     * Update project data by project id, and user id.
     * If the user is owner or admin of the project, he can update all data.
     * In the field "Data" you can indicate one or more fields. All fields can be "undefined" for exemple.
     * @param projectId
     * @param userId
     * @param data
     */
    async update(projectId: string, userId: string, data: Partial<Project>): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to update this project');

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data
        });

        createActivity(userId, projectId, '%user% updated the project');
        return this.projectToReadableData(response);
    }

    /**
     * Delete project by project id, and user id.
     * Only the owner of the project can delete it.
     * @param projectId
     * @param userId
     */
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

    /**
     * This function allows you to check if the user's role in the database is contained in the
     * @param projectId
     * @param userId
     * @param role
     */
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
     * Verify if the user is in the project.
     * @param projectId
     * @param userId
     */
    async checkIfUserIsInProject(projectId: string, userId: string): Promise<boolean> {
        const project = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            },
            include: {
                users: true
            }
        });

        return project.users.some((user) => user.userId === userId);
    }

    /**
     * Add a user to a project, this user will then have an invitation that he will have to validate.
     * @param projectId
     * @param RequestUserId
     * @param email
     */
    async inviteUser(projectId: string, RequestUserId: string, email: string): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, RequestUserId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to invite users to this project');

        const user = await prisma.user.findFirstOrThrow({
            where: {
                email
            }
        });

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    create: {
                        userId: user.id,
                        isInvited: true,
                        role: ProjectRole.USER
                    }
                }
            }
        });

        createActivity(RequestUserId, projectId, '%user% has invited a new member, welcome to' + user.name);
        return this.projectToReadableData(response);
    }

    /**
     * This function allows you to accept an invitation to a project.
     * @param projectId
     * @param userId
     */
    async acceptInvite(projectId: string, userId: string): Promise<ReadableProject> {
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
                            isInvited: false
                        }
                    }
                }
            }
        });

        createActivity(userId, projectId, '%user% has accepted the invitation', ActivityType.CREATE);
        return this.projectToReadableData(response);
    }

    /**
     * This function is used for leaving a project, not usable by owners
     * @param projectId
     * @param userId
     */
    async leaveProject(projectId: string, userId: string): Promise<ReadableProject> {
        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    delete: {
                        projectId_userId: {
                            projectId,
                            userId
                        }
                    }
                }
            }
        });

        createActivity(userId, projectId, '%user% has left the project', ActivityType.DELETE);
        return this.projectToReadableData(response);
    }

    /**
     * Basically kicks a user from a project
     * @param projectId
     * @param RequestUserId
     * @param RemovedUserId
     */
    async removeUserInProject(projectId: string, RequestUserId: string, RemovedUserId: string): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, RequestUserId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to remove users from this project');

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    delete: {
                        projectId_userId: {
                            projectId,
                            userId: RemovedUserId
                        }
                    }
                }
            }
        });

        createActivity(RequestUserId, projectId, '%user% has kicked a member from the project, bye bye', ActivityType.DELETE);
        return this.projectToReadableData(response);
    }

    /**
     * Give to another user the ownership of the project, the actual owner will be demoted to admin
     * @param projectId
     * @param userId
     * @param email
     */
    async transferOwnership(projectId: string, userId: string, email: string): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to transfer ownership of this project');

        const user = await prisma.user.findFirstOrThrow({
            where: {
                email
            }
        });

        await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    update: {
                        where: {
                            projectId_userId: {
                                projectId,
                                userId: userId
                            }
                        },
                        data: {
                            role: ProjectRole.ADMIN
                        }
                    }
                }
            }
        });

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
                                userId: user.id
                            }
                        },
                        data: {
                            role: ProjectRole.OWNER
                        }
                    }
                }
            }
        });

        createActivity(userId, projectId, '%user% has transferred the ownership of the project to ' + user.name);
        return this.projectToReadableData(response);
    }

    /**
     * Change the role of a user in a project, only the owner can do this.
     * The owner can't change his own role.
     * @param projectId
     * @param RequestUserId
     * @param UserId
     * @param role
     */
    async updateUserRole(projectId: string, RequestUserId: string, UserId: string, role: ProjectRole): Promise<ReadableProject> {
        const hasPermission = await this.hasPermission(projectId, RequestUserId, [ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to change roles in this project');
        if (role === ProjectRole.OWNER) throw new Error('You are not allowed to change the role of the owner');
        if (RequestUserId === UserId) throw new Error('You are not allowed to change your own role');

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
                                userId: UserId
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            }
        });

        createActivity(RequestUserId, projectId, '%user% has changed the role of a member to ' + role);
        return this.projectToReadableData(response);
    }

    /**
     * Get all members of a project, including the role, email, name, asset, id, if the user is invited and if the user is the owner
     * @param userId
     * @return {Promise<MembersData>}
     */
    async getMembersData(userId: string): Promise<MembersData> {
        const selectedProject = await this.findSelectedProject(userId);
        if (!selectedProject) throw new Error('No project selected');

        const projectId = selectedProject.id;

        const hasPermission = await this.checkIfUserIsInProject(projectId, userId);
        if (!hasPermission) throw new Error('You are not allowed to get users from this project');

        const project = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            },
            include: {
                users: {
                    include: {
                        UserData: {
                            include: {
                                user: {
                                    select: {
                                        email: true,
                                        name: true,
                                        image: true,
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const selfData = await prisma.projectUser.findUniqueOrThrow({
            where: {
                projectId_userId: {
                    userId,
                    projectId
                }
            }
        });

        return {
            members: project.users.map((user) => {
                return {
                    id: user.userId,
                    name: user.UserData.user.name ?? '',
                    email: user.UserData.user.email ?? '',
                    image: user.UserData.user.image ?? '',
                    role: user.role,
                    joinedAt: user.createdAt.getTime(),
                    isInvited: user.isInvited
                };
            }),
            self: this.projectToPersonalData(selfData),
            projectId
        };
    }

    /**
     * Transforms "ProjectUser" to readable data usable by the client
     * @param userData
     */
    private projectToPersonalData(userData: ProjectUser): PersonalProjectData {
        return {
            role: userData.role,
            joinedAt: userData.createdAt.getTime(),
            isSelected: userData.isSelected,
            userId: userData.userId,
            isInvited: userData.isInvited
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
            createdAt: project.createdAt.getTime(),
            updatedAt: project.updatedAt?.getTime(),
            asset: `${process.env.ASSET_PREFIX}/${project.asset}`,
            items: new ItemRepository(prisma.item).itemsToData(project?.items ?? []),
            recipes: project?.recipes ?? [],
            activities: project?.activities ?? [],
            users:
                project?.users?.map((user) => {
                    return {
                        role: user.role,
                        joinedAt: user.createdAt.getTime(),
                        userId: user.userId
                    };
                }) ?? []
        };
    }

    /**
     * Transforms multiple generic project into a readable project
     * Includes all users and their roles of the project
     * Include readable asset url.
     * @param projects
     */
    private projectsToReadableData(projects: ProjectData[]): ReadableProject[] {
        return projects.map((project) => this.projectToReadableData(project));
    }

    /**
     * Transforms a generic project into a readable project
     * Includes all users and their roles of the project
     * Include readable asset url.
     * @param project
     */
    private projectToReadableData(project: ProjectData): ReadableProject {
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
    private projectsToReadablePersonalData(projects: ProjectData[], userId: string): ReadablePersonalProjectData[] {
        return projects.map((project) => this.projectToReadablePersonalData(project, userId));
    }

    /**
     * Transforms only one "Project" and UserData to readable data usable by the client
     * Project Data and User Data are merged together
     * @param project
     * @param userId
     */
    private projectToReadablePersonalData(project: ProjectData, userId: string): ReadablePersonalProjectData {
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
