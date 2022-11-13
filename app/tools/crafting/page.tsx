import MinecraftSlot from '@components/MinecraftSlot';
import Stone from '@images/placeholder/Stone.webp';
import GoldButton from '@components/form/Gold';
import Arrow from '@images/design/download.png';
import Table from '@images/design/custom_crafting_table.png';

import Image from 'next/image';

export default function Page() {
    return (
        <div className={'flex flex-col md:flex-row'}>
            <div className={'flex flex-col w-full md:w-1/2'}>
                <div className={'pl-10 pr-5 my-10'}>
                    <div className={'border-gold border border-solid bg-black rounded-md px-10 relative'}>
                        <div className={'my-6 flex justify-center'}>
                            <div>
                                <p className={'text-xl font-normal text-white text-start minecraft'}>Crafting table</p>
                                <div className={'flex justify-between items-center w-[18rem]'}>
                                    <div className={'w-[10.5rem] flex flex-wrap'}>
                                        {Array.from(Array(9).keys()).map((i) => (
                                            <MinecraftSlot key={i} image={Stone} />
                                        ))}
                                    </div>
                                    <Image src={Arrow} alt={''} width={32} height={27} />
                                    <MinecraftSlot image={Stone} />
                                </div>
                            </div>
                        </div>
                        <input
                            type="text"
                            className="bg-black w-full text-sm border-2 mb-8 border-solid border-gray-800 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                            placeholder="Craft Name"
                        />
                        <div className={'absolute top-0 left-0 w-16 h-16 m-8'}>
                            <Image src={Table} alt={''} width={200} height={200} />
                        </div>
                    </div>

                    <div className={'border-gold border border-solid bg-black rounded-md px-10 mt-10'}>
                        <div className={'my-10 flex justify-center'}>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col w-full md:w-1/2'}>
                <div className={'pr-10 pl-5 my-10'}>
                    <div className={'border-gold border border-solid bg-black rounded-md px-10'}>
                        <div className={'my-10'}>
                            <div className={'mb-4'}>
                                <div className={'flex justify-between items-center mb-4'}>
                                    <p className={'text-white text-2xl font-normal mb-0 minecraft'}>Minecraft Items</p>
                                    <GoldButton>Add new items</GoldButton>
                                </div>
                                <input
                                    type="text"
                                    className="bg-black w-full text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                                    placeholder="Search an items"
                                />
                            </div>
                            <hr />
                            <div className={'flex flex-wrap justify-center max-h-[500px] overflow-y-auto'}>
                                {Array.from(Array(200).keys()).map((i) => (
                                    <MinecraftSlot image={Stone} key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
