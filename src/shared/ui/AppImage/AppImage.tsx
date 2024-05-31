import { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = (props: AppImageProps): ReactElement => {
    const { src, fallback, errorFallback, alt = 'image', ...restProps } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const image = new Image();

        image.src = src ?? '';
        image.onload = function () {
            setIsLoading(false);
        };
        image.onerror = function () {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return <img src={src} alt={alt} {...restProps} />;
};
