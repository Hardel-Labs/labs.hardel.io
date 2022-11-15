import Image from 'next/image';
import Table from '@images/design/minecraft/custom_crafting_table.png';
import InventoryManager from '@app/tools/crafting/InventoryManager';
import Arrow from '@images/design/minecraft/arrow.png';
import MinecraftSlot from '@components/minecraft/MinecraftSlot';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import CraftingGroupButton from '@app/tools/crafting/CraftingGroupButton';
import CraftingOptions from './CraftingOptions';
import CodePreview from '@app/tools/crafting/CodePreview';
import DNDContextProvider from '@components/dnd/DNDContext';
import CraftingContextProvider from '@app/tools/crafting/Context';

export default function Page() {
    return (
        <DNDContextProvider>
            <CraftingContextProvider>
                <div className={'flex flex-col md:flex-row'}>
                    <div className={'flex flex-col w-full md:w-1/2'}>
                        <div className={'pl-10 pr-5 my-10'}>
                            <div className={'glassmorphism relative'}>
                                <CraftingGroupButton />
                                <div className={'my-6 flex justify-center'}>
                                    <div>
                                        <p className={'text-xl font-normal text-white text-start minecraft'}>Crafting table</p>
                                        <div className={'flex justify-between items-center w-[18rem]'}>
                                            <div className={'w-[10.5rem] flex flex-wrap'}>
                                                {Array.from({ length: 9 }).map((i, index) => (
                                                    <MinecraftSlot id={'crafting:' + +index} key={index} />
                                                ))}
                                            </div>
                                            <Image src={Arrow} alt={''} width={32} height={27} />
                                            <MinecraftSlot id={'crafting:result'} />
                                        </div>
                                    </div>
                                </div>
                                <CraftingOptions />
                                <div className={'absolute top-0 right-0 w-16 h-16 m-6'}>
                                    <Image src={Table} alt={''} width={200} height={200} />
                                </div>
                            </div>

                            <CodePreview />
                        </div>
                    </div>
                    <div className={'flex flex-col w-full md:w-1/2'}>
                        <div className={'pr-10 pl-5 my-10'}>
                            <div className={'glassmorphism px-10'}>
                                <InventoryManager />
                            </div>
                        </div>
                    </div>
                </div>
                <ItemTooltip />
            </CraftingContextProvider>
        </DNDContextProvider>
    );
}
