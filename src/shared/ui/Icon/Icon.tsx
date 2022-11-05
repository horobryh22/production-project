import React, { ReactElement, memo } from 'react';

import classes from './Icon.module.scss';

import { classNames } from 'shared/lib';

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps): ReactElement => {
    const { className, Svg } = props;

    return <Svg className={classNames(classes.Icon, {}, [className])} />;
});
