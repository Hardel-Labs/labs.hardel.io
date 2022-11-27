'use client';
import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import RedButton from '@components/form/Button/Red';
import useSWR from 'swr';
import { ReadablePersonalProjectData } from '@definitions/project';
import fetcher from '@libs/request/client/fetcher';
import { useMemo, useState } from 'react';
import { removeSpacesAndSpecialCharacters } from '@libs/utils';
import { deleteProject } from '@libs/request/client/project';
import { useRouter } from 'next/navigation';

export default function Advanced() {
    const router = useRouter();
    const { data: project, error } = useSWR<ReadablePersonalProjectData>('/api/projects/select', fetcher);
    const [email, setEmail] = useState<string>('');
    const [projectName, setProjectName] = useState<string>('');

    const canDelete = useMemo(() => {
        if (!project || error) return false;

        return projectName === removeSpacesAndSpecialCharacters(project.name).toLowerCase();
    }, [project, error, projectName]);

    const handleDelete = async () => {
        if (!canDelete || !project) return;

        await deleteProject(project.id);
        router.push('/dashboard');
    };

    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Transfer ownership</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Transfer the ownership of your project to another member of your project, your new owner will be able to delete your project and change the settings.
                        <b> Your new role will be set to &quot;Admin&quot;.</b>
                    </p>
                    <div className={'flex flex-row gap-x-2'}>
                        <FormInput placeholder={'hardel@exemple.com'} onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>This action is irreversible</p>
                        <WhiteButton>Transfer</WhiteButton>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-red-700 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Delete this project</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Deleting the project will delete all the data associated with it, including all the users and their data. This action is irreversible, please be careful.
                    </p>
                    <p className={'text-red-400 text-base'}>
                        To delete this project, please type the name of the project.
                        <br />
                        Project name: &quot;<b>{project && !error && removeSpacesAndSpecialCharacters(project.name).toLowerCase()}</b>&quot;
                    </p>
                    <FormInput placeholder={'Project Name'} onChange={(e) => setProjectName(e.target.value)} value={projectName} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-500 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>This action is irreversible, all data will be lost.</p>
                        <RedButton disabled={!canDelete} onClick={() => handleDelete()}>
                            Delete
                        </RedButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
