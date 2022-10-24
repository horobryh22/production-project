export type Mods = Record<string, string | boolean | undefined>;

export const classNames = (
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
): string => {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, flag]) => Boolean(flag))
            .map(([cls]) => cls),
    ].join(' ');
};
