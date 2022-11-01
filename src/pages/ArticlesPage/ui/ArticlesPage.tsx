import { ReactElement, memo } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './ArticlesPage.module.scss';

import { classNames } from 'shared/lib';

interface ArticlePageProps {
    className?: string;
}

const ArticlesPage = memo((props: ArticlePageProps): ReactElement => {
    const { className } = props;
    const {} = useTranslation('article');

    return <div className={classNames(classes.ArticlePage, {}, [className])}></div>;
});

export default ArticlesPage;
