import { ReactElement, memo } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './ArticleDetailsPage.module.scss';

import { classNames } from 'shared/lib';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps): ReactElement => {
    const { className } = props;
    const {} = useTranslation('article');

    return (
        <div className={classNames(classes.ArticleDetailsPage, {}, [className])}></div>
    );
});

export default ArticleDetailsPage;
