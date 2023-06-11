import { memo, ReactElement } from 'react';

import { ArticleImageBlock } from '../../model/types';

import classes from './ArticleImageBlockComponent.module.scss';

import { classNames } from '@/shared/lib';
import { TextAlign, Text } from '@/shared/ui/Text/Text';

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
