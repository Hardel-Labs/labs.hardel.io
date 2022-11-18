import React, { CSSProperties } from 'react';

const height: CSSProperties = {
    minHeight: 'calc(100vh - 210px)'
};

export default function Home() {
    return (
        <section className={'overflow-hidden flex'} style={height}>
            <div className={'container mx-auto flex flex-col justify-center items-center'}>
                <h1 className={'font-bold text-gold text-center'}>Dashboard</h1>
                <hr />
                <p className={'text-white w-fit text-2xl font-semibold text-center'}>
                    Welcome to the <span className={'text-gold'}>Administrator</span> dashboard
                </p>
            </div>
        </section>
    );
}
