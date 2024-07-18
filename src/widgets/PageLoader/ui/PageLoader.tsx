import { ReactElement } from 'react';

import { classNames } from '@/shared/lib';
import { Loader } from '@/shared/ui';

import classes from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
    maxHeight?: boolean;
}

export const PageLoader = ({ className, maxHeight }: PageLoaderProps): ReactElement => {
    return (
        <div
            className={classNames(
                classes.PageLoader,
                { [classes.maxHeight]: maxHeight },
                [className],
            )}
        >
            <Loader />
        </div>
    );
};
