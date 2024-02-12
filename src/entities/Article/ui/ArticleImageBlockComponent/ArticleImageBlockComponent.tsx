import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib';
import { TextAlign, Text } from '@/shared/ui';

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
                <img src={src} alt="image" />
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
