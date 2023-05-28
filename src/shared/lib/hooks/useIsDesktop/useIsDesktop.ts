import { useEffect, useState } from 'react';

// значение захардкожено, так как данное приложение адаптировано только под Desktop и Mobile версии
const MEDIA_QUERY: string = '(min-width: 768px)';

export const useIsDesktop = (): boolean => {
    const defineDevice = (): boolean => window.matchMedia(MEDIA_QUERY).matches;

    const [isDesktop, setIsDesktop] = useState(defineDevice());

    useEffect(() => {
        const handleResize = (): void => {
            setIsDesktop(defineDevice());
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isDesktop;
};
