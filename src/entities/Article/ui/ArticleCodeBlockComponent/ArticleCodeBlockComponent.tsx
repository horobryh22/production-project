import { ReactElement, memo } from 'react';

import { classNames } from '@/shared/lib';
import { Code } from '@/shared/ui';

import { ArticleCodeBlock } from '../../model/types';

import classes from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps): ReactElement => {
        const { className, block } = props;

        return (
            <div
                className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}
            >
                <Code text={block.code} copy />
            </div>
        );
    },
);
