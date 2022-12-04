'use client';

import Drawer from '@components/drawer';
import React from 'react';
import WhiteButton from '@components/form/Button/White';
import CreateProject from '@components/drawer/container/CreateProject';

export default function ButtonProject() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div className={'flex'}>
                <WhiteButton onClick={() => setOpen(true)} className={'ml-4'}>
                    New project
                </WhiteButton>
            </div>

            <Drawer title={'Create a new project'} description={'Create a new project to start your adventure on hardel.io'} onClose={() => setOpen(false)} isOpened={open}>
                <CreateProject onClose={() => setOpen(false)} />
            </Drawer>
        </>
    );
}
