import React, { ReactElement, memo } from 'react';

import classes from './Icon.module.scss';

import { classNames } from 'shared/lib';

type IconTheme = 'primary' | 'inverted';
interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    theme?: IconTheme;
}

export const Icon = memo((props: IconProps): ReactElement => {
    const { className, Svg, theme = 'primary' } = props;

    return <Svg className={classNames(classes[theme], {}, [className])} />;
});
