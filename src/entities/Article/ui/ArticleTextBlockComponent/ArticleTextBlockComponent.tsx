import { ReactElement, memo } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './ArticleTextBlockComponent.module.scss';

import { classNames } from 'shared/lib';

interface ArticleTextBlockComponentProps {
    className?: string;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps): ReactElement => {
        const { className } = props;
        const {} = useTranslation();

        return (
            <div
                className={classNames(classes.ArticleTextBlockComponent, {}, [className])}
            ></div>
        );
    },
);
