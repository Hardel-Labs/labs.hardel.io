'use client';

import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import React from 'react';
import { useRouter } from 'next/navigation';
import FileInput from '@components/form/FileInput';
import { createProject, uploadProjectAsset } from '@libs/request/client/project';
import { removeSpacesAndSpecialCharacters } from '@libs/utils';
import { Project } from '@prisma/client';
import HardelLoader from '@components/loader/HardelLoader';

type Props = {
    onClose: () => void;
};

export default function CreateProject(props: Props) {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [version, setVersion] = React.useState('1.19.x');
    const [asset, setAsset] = React.useState<File | undefined>();
    const [pending, setPending] = React.useState(false);

    const sendData = async () => {
        if (!asset) return;

        setPending(true);
        const namespace = removeSpacesAndSpecialCharacters(name).toLowerCase();
        const insertedData = await createProject<Project>({ name, description, version, namespace });
        if (insertedData.request.success) {
            const project = insertedData.data as Project;
            await uploadProjectAsset(project.id, asset, (success) => {
                if (success) {
                    setName('');
                    setDescription('');
                    setAsset(undefined);
                    setPending(false);
                    props.onClose();
                    router.refresh();
                }
            });
        }

        setPending(false);
    };

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Name</p>
                    <small className="text-sm text-gray-400">Enter a name for your project</small>
                </div>
                <FormInput placeholder={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                <hr />
            </div>

            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Description</p>
                    <small className="text-sm text-gray-400">The description can be changed later</small>
                </div>
                <FormInput placeholder={'Description'} value={description} onChange={(e) => setDescription(e.target.value)} />
                <hr />
            </div>

            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Asset</p>
                    <small className="text-sm text-gray-400">The asset of minecraft data pack</small>
                </div>
                <FileInput onChange={(file) => setAsset(file)} />
                <hr />
            </div>

            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Version</p>
                    <small className="text-sm text-gray-400">The version of minecraft data pack</small>
                </div>
                <FormInput disabled placeholder={'Version'} value={version} onChange={(e) => setVersion(e.target.value)} />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                {pending ? (
                    <div className={'p-4'}>
                        <HardelLoader />
                    </div>
                ) : (
                    <WhiteButton onClick={() => sendData()}>Create</WhiteButton>
                )}
            </div>
        </div>
    );
}
