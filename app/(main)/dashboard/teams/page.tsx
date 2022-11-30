import Slash from '@icons/Slash';
import React from 'react';
import MemberManager from '@main/dashboard/teams/MemberManager';

export default function Teams() {
    return (
        <section className={'min-height-view flex flex-col border-b-gold border-b-8 border-solid'}>
            <div className={'py-10 px-[150px] w-full'}>
                <div className={'flex gap-x-4'}>
                    <h1 className={'text-4xl font-bold text-gold'}>Dashboard</h1>
                    <Slash />
                    <span className={'text-4xl font-bold text-zinc-200'}>Members</span>
                </div>
                <hr className={'mb-8'} />
                <MemberManager />
            </div>
        </section>
    );
}
