'use client';

import Drawer from '@components/drawer';
import { useState } from 'react';

export default function DrawerManager() {
    const [open, setOpen] = useState(true);

    return (
        <Drawer onClose={() => setOpen(false)} isOpened={open} title={'Drawer'}>
            <div>Jeje</div>
        </Drawer>
    );
}
