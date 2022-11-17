import { useCallback, useMemo, useState } from 'react';

interface UseHoverBind {
    onMouseLeave: () => void;
    onMouseEnter: () => void;
}

type useHoverResult = [boolean, UseHoverBind];

export const useHover = (): useHoverResult => {
    const [hover, setHover] = useState(false);

    const onMouseLeave = useCallback((): void => setHover(false), []);
    const onMouseEnter = useCallback((): void => setHover(true), []);

    return useMemo(
        () => [hover, { onMouseLeave, onMouseEnter }],
        [hover, onMouseEnter, onMouseLeave],
    );
};
