'use client';

import Drawer from '@components/drawer';
import { useContext } from 'react';
import { DrawerContext } from '@main/generator/crafting/(component)/DrawerContext';

export default function DrawerManager() {
    const { open, setOpen, children } = useContext(DrawerContext);

    return (
        <Drawer onClose={() => setOpen(false)} isOpened={open} title={'Drawer'}>
            {children}
        </Drawer>
    );
}
