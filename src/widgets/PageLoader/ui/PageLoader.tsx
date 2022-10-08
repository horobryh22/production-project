import { ReactElement } from 'react';

import classes from './PageLoader.module.scss';

import { classNames } from 'shared/lib';
import { Loader } from 'shared/ui';

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
