import { ReactElement, memo } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './ArticleImageBlockComponent.module.scss';

import { classNames } from 'shared/lib';

interface ArticleImageBlockComponentProps {
    className?: string;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps): ReactElement => {
        const { className } = props;
        const {} = useTranslation();

        return (
            <div
                className={classNames(classes.ArticleImageBlockComponent, {}, [
                    className,
                ])}
            ></div>
        );
    },
);
