import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import SimpleSelect from '@components/form/Select/simple';
import Image from 'next/image';
import Harion from '@images/harion.webp';
import SmallSelect from '@components/form/Select/SmallSelect';
import { ROLES } from '@libs/constant';

const tempusers = [
    {
        name: 'John Doe',
        email: 'exemple@gmail.com',
        role: 'Admin'
    },
    {
        name: 'John Doe',
        email: 'exemple@gmail.com',
        role: 'Admin'
    },
    {
        name: 'John Doe',
        email: 'exemple@gmail.com',
        role: 'Admin'
    },
    {
        name: 'John Doe',
        email: 'exemple@gmail.com',
        role: 'Admin'
    }
];

export default function Members() {
    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Add new members</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>Invite new members to your project, use the email address of the person you want to invite.</p>
                    <div className={'flex flex-row gap-x-2'}>
                        <FormInput placeholder={'hardel@exemple.com'} />
                        <SimpleSelect options={ROLES} />
                    </div>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-end items-center'}>
                        <WhiteButton>Invite</WhiteButton>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8 border-zinc-600 border-b'}>
                    <h1 className={'text-2xl text-white'}>Members</h1>
                    <p className={'text-zinc-400 text-base mb-0'}>Here is the list of all the members of your project, you can change their role or remove them.</p>
                </div>
                {tempusers.map((user, index) => (
                    <div key={index} className={'flex flex-row items-center justify-between gap-x-4 p-8 border-zinc-600 border-b'}>
                        <div className={'flex gap-x-6 items-center'}>
                            <div className={'w-10 h-10'}>
                                <Image className={'w-full h-full rounded-full'} src={Harion} alt={'Harion'} width={40} height={40} />
                            </div>
                            <div className={'flex flex-col'}>
                                <p className={'text-white text-base mb-1'}>{user.name}</p>
                                <p className={'text-zinc-400 text-base mb-0'}>{user.email}</p>
                            </div>
                        </div>
                        <div className={'flex items-center gap-x-6'}>
                            <SmallSelect options={ROLES} />
                            <div className={'text-zinc-400 hover:text-red-700 transition cursor-pointer select-none'}>Remove</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
