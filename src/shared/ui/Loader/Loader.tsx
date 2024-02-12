import { ReactElement } from 'react';

import { classNames } from '@/shared/lib';

import classes from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps): ReactElement => {
    return (
        <div className={classNames(classes['lds-ring'], {}, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
