import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './ArticlesPage.module.scss';

import { ArticlesList, ArticleView } from 'entities/Article';
import { classNames } from 'shared/lib';

interface ArticlePageProps {
    className?: string;
}

const ArticlesPage = memo((props: ArticlePageProps): ReactElement => {
    const { className } = props;
    const {} = useTranslation('article');

    return (
        <div className={classNames(classes.ArticlePage, {}, [className])}>
            <ArticlesList articles={[]} view={ArticleView.LIST} />
        </div>
    );
});

export default ArticlesPage;
