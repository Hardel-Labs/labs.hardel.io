import GoldButton from '@components/form/Gold';
import RainbowButton from '@components/form/Rainbox';
import WhiteButton from '@components/form/White';
import Skew from '@components/Skew';
import { CSSProperties } from 'react';
import Image from 'next/image';
import CraftingCover from '@images/cover/hqdefault.jpg';
import Check from '@components/Check';
import Link from 'next/link';

const backgroundBlack: CSSProperties = {
    backgroundImage: "url('/images/design/hex-222.png'), radial-gradient(at center top, #212121, #191919, #0f0f0f, #000000)"
};

export default function Home() {
    return (
        <>
            <section style={backgroundBlack} className={'h-[100vh] overflow-hidden relative z-10 royal-border'}>
                <div className={'container mx-auto h-full flex flex-col justify-center items-center'}>
                    <h1 className={'font-bold text-gold text-center'}>Hardel Labs</h1>
                    <hr />
                    <p className={'text-white w-fit text-2xl font-semibold text-center'}>Very simple and powerful tools to create datapacks.</p>
                    <p className={'text-gray-400 text-sm text-center w-1/2'}>
                        Try now to create your first optimized and fast datapack without any knowledge in development and programming languages.
                    </p>
                    <div className={'mt-8'}>
                        <GoldButton className={'mx-4'}>Donation</GoldButton>
                        <RainbowButton className={'mx-4'}>Try Now</RainbowButton>
                        <WhiteButton className={'mx-4'}>Learn More</WhiteButton>
                    </div>
                    <Skew />
                </div>
            </section>
            <section className={'shadow-section overflow-hidden bg-royal py-20 royal-border'}>
                <div className={'container w-10/12 mx-auto'}>
                    <div className={'grid grid-cols-1 md:grid-cols-5 gap-8'}>
                        <div className={'md:col-span-2 bg-transparent self-center rounded-royal'}>
                            <Image src={CraftingCover} alt={'Crafting Cover'} width={1280} height={720} className={'rounded-royal border-gold border-2 border-solid shadow-big'} />
                        </div>
                        <div className={'md:col-span-3 pl-20 py-4'}>
                            <h1 className={'text-white text-4xl font-bold'}>Crafting Generator</h1>
                            <p className={'text-gray-400 text-sm mt-4'}>
                                Crafting Generator is a tool that allows you to create crafting recipes in a very simple way, and also use &quot;NBT&quot; items in a special custom
                                crafting table.
                            </p>
                            <hr />
                            <div className={'grid grid-cols-1 gap-8 py-2 md:grid-cols-2'}>
                                <div className={'flex flex-col gap-y-6'}>
                                    <Check>No programming knowledge required</Check>
                                    <Check>Custom crafting table for NBT</Check>
                                    <Check>Crafting table, furnace and other blocks.</Check>
                                </div>
                                <div className={'flex flex-col gap-y-6'}>
                                    <Check>Free</Check>
                                    <Check>Open Source</Check>
                                    <Check>Fast and optimized datapacks</Check>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className={'my-10'} />
                    <div className={'w-full flex justify-center mt-12'}>
                        <Link href={'/tools/crafting'}>
                            <RainbowButton className={'mx-4'}>Try it Now</RainbowButton>
                        </Link>
                        <WhiteButton className={'mx-4'}>View changelog</WhiteButton>
                    </div>
                </div>
            </section>
            <section className={'shadow-section overflow-hidden bg-royal-reverse py-20'}>
                <div className={'container w-10/12 mx-auto'}>
                    <h2>Other tools :</h2>
                    <hr className={'mb-20'} />
                    <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'}>
                        <Image src={CraftingCover} alt={'Crafting Cover'} width={1280} height={720} className={'rounded-royal border-gold border-2 border-solid shadow-big'} />
                        <Image src={CraftingCover} alt={'Crafting Cover'} width={1280} height={720} className={'rounded-royal border-gold border-2 border-solid shadow-big'} />
                        <Image src={CraftingCover} alt={'Crafting Cover'} width={1280} height={720} className={'rounded-royal border-gold border-2 border-solid shadow-big'} />
                        <Image src={CraftingCover} alt={'Crafting Cover'} width={1280} height={720} className={'rounded-royal border-gold border-2 border-solid shadow-big'} />
                        <Image src={CraftingCover} alt={'Crafting Cover'} width={1280} height={720} className={'rounded-royal border-gold border-2 border-solid shadow-big'} />
                    </div>
                    <hr className={'my-10'} />
                    <div className={'w-full flex justify-center mt-12'}>
                        <WhiteButton>View other tools</WhiteButton>
                    </div>
                </div>
            </section>
        </>
    );
}
