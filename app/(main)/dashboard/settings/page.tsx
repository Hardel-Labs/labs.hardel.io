import WhiteButton from '@components/form/Button/White';
import FormInput from '@components/form/input';
import RedButton from '@components/form/Button/Red';
import SimpleSelect from '@components/form/Select/simple';
import { VERSION } from '@libs/constant';
import FileInput from '@components/form/FileInput';

export default function Settings() {
    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project Name</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>You can change the name of your project here, the modification will be applied to all users.</p>
                    <FormInput placeholder={'Project Name'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>Maximum 50 characters.</p>
                        <WhiteButton>Update</WhiteButton>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project Description</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>You can change the description of your project here, be short and inventive 😁</p>
                    <FormInput placeholder={'Project description'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>Maximum 255 characters.</p>
                        <WhiteButton>Update</WhiteButton>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project image</h1>
                    <p className={'text-zinc-400 text-base mb-2'}>You can change the image of your project here noted some rules:</p>
                    <ul className={'text-zinc-400 text-base list-disc list-inside mb-4'}>
                        <li className={'text-zinc-400 text-base'}>The image must be in one of the following formats: png, jpg, jpeg, gif or webp.</li>
                        <li className={'text-zinc-400 text-base'}>The image must not exceed 1MB</li>
                        <li className={'text-zinc-400 text-base'}>The image will be automatically resized to 64x64 pixel</li>
                    </ul>
                    <FileInput />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>
                            <span className={'text-red-500'}>*</span> Maximum 3 modifications per day.
                        </p>
                        <WhiteButton>Upload</WhiteButton>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project Version</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>Its the minecraft version of your project, you can change it here, the modification will be applied to all users.</p>
                    <SimpleSelect options={VERSION} values={VERSION[0].value} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>Only 1.19.x Available</p>
                        <WhiteButton>Update</WhiteButton>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project namespace</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>A namespace represents in a data pack the folder where all technical data will be present.</p>
                    <FormInput placeholder={'Project namespace'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>Only lowercase characters or underscore</p>
                        <WhiteButton>Update</WhiteButton>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project Identifiant</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>Its a unique identifier for your project, you can use it to contact the support team if you have any problem.</p>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>For contact staff use this identifiant.</p>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-red-700 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Delete this project</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Deleting the project will delete all the data associated with it, including all the users and their data. This action is irreversible, please be careful.
                    </p>
                    <FormInput placeholder={'Project Name'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-500 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>This action is irreversible, all data will be lost.</p>
                        <RedButton>Delete</RedButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
