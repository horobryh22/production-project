import { ReactElement } from 'react';

import classes from './Loader.module.scss';

import { classNames } from 'shared/lib';

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
