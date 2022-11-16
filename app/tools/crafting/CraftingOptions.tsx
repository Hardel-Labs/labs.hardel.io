'use client';

export default function CraftingGroupButton() {
    return (
        <div className={'px-10'}>
            <input
                type="text"
                className="bg-zinc-900 w-full text-sm border-2 mb-8 border-solid border-white/20 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                placeholder="Craft Name"
            />
        </div>
    );
}
