import HardelLetter from '@icons/logo/HardelLetter';

export default function Teams() {
    return (
        <div className={'w-full height-view flex flex-col justify-center items-center border-b-gold border-b-8 border-solid'}>
            <h1 className={'text-4xl font-bold text-gold'}>Pages under construction.</h1>
            <p className={'text-xl font-bold my-4 text-white'}>We are working hard to bring you the best experience.</p>
            <hr />
            <div className={'mb-8 mt-4 animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold flex justify-between items-center'}>
                <HardelLetter className={'w-32 h-32 fill-zinc-500'} />
            </div>
        </div>
    );
}
