import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib';
import { TextAlign, Text, AppImage, Skeleton } from '@/shared/ui';

import { ArticleImageBlock } from '../../model/types';

import classes from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps): ReactElement => {
        const {
            className,
            block: { src, title },
        } = props;

        return (
            <div
                className={classNames(classes.ArticleImageBlockComponent, {}, [
                    className,
                ])}
            >
                <AppImage src={src} fallback={<Skeleton width={'100%'} height={200} />} />
                {title && (
                    <Text
                        text={title}
                        className={classes.title}
                        align={TextAlign.CENTER}
                    />
                )}
            </div>
        );
    },
);
