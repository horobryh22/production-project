import React, { ReactElement, memo } from 'react';

import { classNames } from '@/shared/lib';

import classes from './Icon.module.scss';

type IconTheme = 'primary' | 'inverted' | 'outline';
interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    theme?: IconTheme;
}

export const Icon = memo((props: IconProps): ReactElement => {
    const { className, Svg, theme = 'primary', ...restProps } = props;

    return <Svg {...restProps} className={classNames(classes[theme], {}, [className])} />;
});
