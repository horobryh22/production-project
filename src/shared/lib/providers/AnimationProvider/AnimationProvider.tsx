import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

export interface AnimationContextPayload {
    Spring?: SpringType;
    Gesture?: GestureType;
    isLoaded?: boolean;
}

interface AnimationProviderType {
    children: ReactNode;
}

const AnimationContext = createContext<AnimationContextPayload>({});

export const useAnimationModules = (): AnimationContextPayload => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

// позволяет подгружать библиотеки по мере необходимости, в конкретных местах, они не идут в общий бандл
export const AnimationProvider = ({ children }: AnimationProviderType) => {
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            (async function () {
                const [springLib, gestureLib] = await Promise.all([
                    import('@react-spring/web'),
                    import('@use-gesture/react'),
                ]);

                SpringRef.current = springLib;
                GestureRef.current = gestureLib;
                setIsLoaded(true);
            })();
        } catch (e) {
            console.error('Не удалось импортировать библиотеки Spring и Gesture');
        }
    }, []);

    const value: AnimationContextPayload = useMemo(() => {
        return {
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        };
    }, [isLoaded]);

    return (
        <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
    );
};
