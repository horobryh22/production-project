import { ReactElement } from 'react';

import { classNames } from '@/shared/lib';
import { Loader } from '@/shared/ui';

import classes from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps): ReactElement => {
    return (
        <div className={classNames(classes.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
};
