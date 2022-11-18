import Switch from '@components/form/Switch';
import React from 'react';
import WhiteButton from '@components/form/White';
import GoldButton from '@components/form/Gold';

function SettingsEntry(props: { title: string; description?: string; children: React.ReactNode; inline?: boolean }) {
    return (
        <>
            <hr />
            <div className={'flex justify-between w-full' + (props.inline ? ' flex-col' : ' flex-row items-center')}>
                <div className={props.inline ? 'pb-3' : 'pr-3'}>
                    <span className="block text-sm font-bold text-white">{props.title}</span>
                    {props.description && <p className="text-xs text-gray-400 mb-0">{props.description}</p>}
                </div>
                <div className="flex-shrink-0">{props.children}</div>
            </div>
        </>
    );
}

function SettingsContainer(props: { title: string; children: React.ReactNode }) {
    return (
        <div className="py-3 px-4 border-gold/50 bg-black rounded-xl border-solid border min-w-[300px] max-w-[400px]">
            <p className={'text-white font-bold'}>{props.title}</p>
            {props.children}
        </div>
    );
}

export default function SidebarSettings() {
    return (
        <>
            <div className={'p-2 max-w-[370px]'}>
                <h5 className={'text-white font-bold text-2xl mb-4'}>Settings informations</h5>
                <p className={'text-zinc-400 text-sm font-normal mb-0'}>This tab offers global and generic configuration to the selected projects.</p>
            </div>
            <hr />
            <div className={'flex flex-col gap-y-4 overflow-y-auto'}>
                <SettingsContainer title={'Projects'}>
                    <SettingsEntry title={'Project name'}>
                        <input
                            type="text"
                            className="bg-black text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                            placeholder="Project name"
                            defaultValue={'Placeholder Project'}
                        />
                    </SettingsEntry>
                    <SettingsEntry title={'Project description'} inline={true}>
                        <textarea
                            className="bg-black w-full text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                            placeholder="Project description"
                        />
                    </SettingsEntry>
                    <GoldButton className={'mt-6 mb-4 w-full mx-0'}>Manage collaborators</GoldButton>
                    <WhiteButton className={'mb-4 w-full mx-0'}>See more projects settings</WhiteButton>
                </SettingsContainer>

                <SettingsContainer title={'Data packs'}>
                    <SettingsEntry title={'Minecraft version'} description={'The Minecraft version used for the data pack.'}>
                        <select className="bg-black text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-gold">
                            <option value={'1.16.5'}>1.16.5</option>
                            <option value={'1.17'}>1.17</option>
                        </select>
                    </SettingsEntry>
                    <SettingsEntry title={'Namespace'} description={'The namespace used for the data pack.'}>
                        <input
                            type="text"
                            className="bg-black text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                            placeholder="Namespace"
                        />
                    </SettingsEntry>
                    <WhiteButton className={'mt-6 mb-4 w-full'}>See more data packs settings</WhiteButton>
                </SettingsContainer>

                <SettingsContainer title={'Theming'}>
                    <SettingsEntry title={'Dark mode'} description={'Change the theme of the website.'}>
                        <Switch />
                    </SettingsEntry>

                    <SettingsEntry title={'Country'} description={'Change the country of the website all will be translated'}>
                        <select className="bg-black text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-gold">
                            <option value="fr">France</option>
                            <option value="en">England</option>
                            <option value="us">United States</option>
                        </select>
                    </SettingsEntry>
                </SettingsContainer>

                <SettingsContainer title={'Notification'}>
                    <SettingsEntry title={'Disable'} description={'Disable all the notification.'}>
                        <Switch />
                    </SettingsEntry>
                    <SettingsEntry title={'Sound'} description={'Enable the sound of the notification'}>
                        <Switch />
                    </SettingsEntry>
                </SettingsContainer>
            </div>
        </>
    );
}
