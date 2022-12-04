export default function Head() {
    const description = `Hardel Labs is a free website where you can create additional content in Minecraft using online tools that use the latest technology.
    Collaborate, share and update easily.
    No development skills or advanced knowledge is required to create optimized content.`;

    return (
        <>
            <title>Hardel Labs</title>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />
            <meta name="author" content="Hardel" />
            <meta property="og:url" content="https://labs.hardel.io" />
            <meta property="og:title" content="Hardel - Labs" />
            <meta property="og:site_name" content="https://labs.hardel.io" />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://hardel.fr/avatar/bQthkqHv4hV1IcxlObVON8DXwIZY1RW6.png" />
            <meta
                name="keywords"
                content="MapMaking, Minecraft, Hardel, Datapack, Data packs, Dataworld, Modding, RessourcePack, LootTable, Predicate, Advancement, Map, Mods, Enchant+, Crafting, tools, generator, Minecraft commands, WebApp, Labs, Hardel Labs, HardelIO"
            />
        </>
    );
}
