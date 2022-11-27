import HighlightSection from '@components/codeblock/HighlightSection';
import FileCopy from '@icons/Common/FileCopy';
import Download from '@icons/Common/Download';

export default function CodeBlock(props: { children: string; language: string; title?: string }) {
    return (
        <div className={'relative z-10 w-full px-4 pt-4 mt-10 glassmorphism'}>
            <div className={'absolute z-10 top-0 right-0 m-4'}>
                <div className={'flex flex-col gap-y-4'}>
                    <FileCopy className={'w-12 h-12 p-2 hover:bg-black/30 cursor-pointer transition bg-black/10 border border-white/20 rounded-md fill-zinc-400 cursor-pointer'} />
                    <Download className={'w-12 h-12 p-2 hover:bg-black/30 cursor-pointer transition bg-black/10 border border-white/20 rounded-md fill-zinc-400 cursor-pointer'} />
                </div>
            </div>
            <div className={'flex h-4 mr-16'}>
                <div className={'flex items-center z-10'}>
                    <div className={'w-3 h-3 rounded-full bg-red-500 mr-2'} />
                    <div className={'w-3 h-3 rounded-full bg-yellow-500 mr-2'} />
                    <div className={'w-3 h-3 rounded-full bg-green-500 mr-2'} />
                </div>
                <div className={'flex items-center justify-center w-full text-sm font-medium z-20 text-ellipsis whitespace-nowrap m-0 p-0 text-center'}>
                    {props.title && <span className={'text-secondary'}>{props.title}</span>}
                </div>
            </div>
            <div className={'overflow-auto h-full w-full z-10'}>
                <div className={'h-auto text-white pt-4 bg-transparent border-none text-base relative overflow-hidden'}>
                    <HighlightSection language={props.language}>{props.children}</HighlightSection>
                </div>
            </div>
        </div>
    );
}
