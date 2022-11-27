import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';

export default function Advanced() {
    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Transfer ownership</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Transfer the ownership of your project to another member of your project, your new owner will be able to delete your project and change the settings.
                        <b> Your new role will be set to &quot;Admin&quot;.</b>
                    </p>
                    <div className={'flex flex-row gap-x-2'}>
                        <FormInput placeholder={'hardel@exemple.com'} />
                    </div>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>This action is irreversible</p>
                        <WhiteButton>Transfer</WhiteButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
