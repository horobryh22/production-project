import { ReactElement, memo } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './ArticleCodeBlockComponent.module.scss';

import { classNames } from 'shared/lib';

interface ArticleCodeBlockComponentProps {
    className?: string;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps): ReactElement => {
        const { className } = props;
        const {} = useTranslation();

        return (
            <div
                className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}
            ></div>
        );
    },
);
