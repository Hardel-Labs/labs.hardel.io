'use client';
import useSWR from 'swr';
import { MembersData } from '@definitions/project';
import fetcher from '@libs/request/client/fetcher';
import FormInput from '@components/form/input';
import { ROLES } from '@libs/constant';
import WhiteButton from '@components/form/Button/White';
import Image from 'next/image';
import Harion from '@images/harion.webp';
import SmallSelect from '@components/form/Select/SmallSelect';
import { ProjectRole } from '@prisma/client';
import { banProjectMember, changeUserRole, inviteProjectMember } from '@libs/request/client/project';
import { useState } from 'react';
import InvitationBadge from '@components/badge/Invitation';

export default function Front() {
    const { data } = useSWR<MembersData>('/api/projects/members', fetcher);
    const [email, setEmail] = useState<string>('');

    const handleRoleChange = async (role: string | undefined, id: string) => {
        if (!data || !role) return;

        await changeUserRole(data.projectId, id, role as ProjectRole);
    };

    const handleAddMember = async () => {
        if (!data) return;

        await inviteProjectMember(data.projectId, email);
    };

    const handleDeleteMember = async (id: string) => {
        if (!data) return;

        await banProjectMember(data.projectId, id);
    };

    return (
        <>
            <div className={'flex flex-col gap-y-8'}>
                <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                    <div className={'p-8'}>
                        <h1 className={'text-2xl text-white'}>Add new members</h1>
                        <hr />
                        <p className={'text-zinc-400 text-base'}>Invite new members to your project, use the email address of the person you want to invite.</p>
                        <div className={'flex flex-row gap-x-2'}>
                            <FormInput placeholder={'hardel@exemple.com'} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                        <div className={'flex flex-row justify-end items-center'}>
                            <WhiteButton onClick={() => handleAddMember()}>Invite</WhiteButton>
                        </div>
                    </div>
                </div>

                <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                    <div className={'p-8 border-zinc-600 border-b'}>
                        <h1 className={'text-2xl text-white'}>Members</h1>
                        <p className={'text-zinc-400 text-base mb-0'}>Here is the list of all the members of your project, you can change their role or remove them.</p>
                    </div>
                    <>
                        {data?.members.map((member, index) => (
                            <div key={index} className={'flex flex-row items-center justify-between gap-x-4 p-8 border-zinc-600 border-b'}>
                                <div className={'flex gap-x-6 items-center'}>
                                    <div className={'w-10 h-10'}>
                                        <Image className={'w-full h-full rounded-full'} src={member.image} alt={'Harion'} width={40} height={40} />
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <div className={'flex gap-x-2 items-center mb-1 '}>
                                            <p className={'text-white text-base mb-0'}>{member.name}</p>
                                            {member.isInvited && <InvitationBadge />}
                                        </div>
                                        <p className={'text-zinc-400 text-base mb-0'}>{member.email}</p>
                                    </div>
                                </div>
                                {data?.self.userId === member.id ? (
                                    <div className={'text-zinc-400'}>{member.role}</div>
                                ) : (
                                    <>
                                        {data?.self.role === ProjectRole.OWNER ? (
                                            <div className={'flex items-center gap-x-6'}>
                                                <SmallSelect options={ROLES} defaultValue={member.role} onChange={(value) => handleRoleChange(value, member.id)} />
                                                <div
                                                    onClick={() => handleDeleteMember(member.id)}
                                                    className={'text-zinc-400 hover:text-red-700 transition cursor-pointer select-none'}
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={'text-zinc-400'}>{member.role}</div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                    {!data &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className={'flex flex-row items-center justify-between gap-x-4 p-8 border-zinc-600 border-b'}>
                                <div className={'flex gap-x-6 items-center'}>
                                    <div className={'w-10 h-10'}>
                                        <div className={'w-full h-full rounded-full bg-zinc-900 animate-pulse'} />
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <div className={'text-white text-base mb-1 w-32 h-4 bg-zinc-900 animate-pulse'} />
                                        <div className={'text-zinc-400 text-base mb-0 w-32 h-4 bg-zinc-900 animate-pulse'} />
                                    </div>
                                </div>

                                <div className={'flex items-center gap-x-6'}>
                                    <div className={'w-32 h-4 bg-zinc-900 animate-pulse'} />
                                    <div className={'text-zinc-400 w-32 h-4 bg-zinc-900 animate-pulse'} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
