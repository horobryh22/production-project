type Mods = Record<string, string | boolean>;


export const classNames = (cls: string, mods: Mods = {}, additional: string[] = []): string => {

    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, flag]) => Boolean(flag))
            .map(([cls]) => cls),
    ]
        .join(' ');

}