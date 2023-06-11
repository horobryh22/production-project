import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleTextBlock } from '../../model/types';

import classes from './ArticleTextBlockComponent.module.scss';

import { classNames } from '@/shared/lib';
import { Text } from '@/shared/ui';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps): ReactElement => {
        const { className, block } = props;
        const {} = useTranslation();

        return (
            <div
                className={classNames(classes.ArticleTextBlockComponent, {}, [className])}
            >
                {block.title && <Text title={block.title} className={classes.title} />}
                {block?.paragraphs?.map((paragraph, index) => (
                    <Text key={index} text={paragraph} className={classes.paragraph} />
                ))}
            </div>
        );
    },
);
