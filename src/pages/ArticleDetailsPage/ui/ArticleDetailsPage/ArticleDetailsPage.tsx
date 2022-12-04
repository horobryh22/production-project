import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';

import classes from './ArticleDetailsPage.module.scss';

import { ArticleDetails } from 'entities/Article';
import { ArticleComments } from 'features/ArticleDetailsComments';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import { classNames } from 'shared/lib';
import { Text } from 'shared/ui';
import { TextTheme } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps): ReactElement => {
    const { className } = props;
    const { t } = useTranslation('article');

    let { id } = useParams();

    if (!id && __PROJECT__ === 'storybook') id = '1';

    if (!id) {
        return (
            <Page className={classNames(classes.ArticleDetailsPage, {}, [className])}>
                <Text
                    theme={TextTheme.ERROR}
                    text={t('Article not found', { ns: 'article' })}
                />
            </Page>
        );
    }

    return (
        <Page className={classNames(classes.ArticleDetailsPage, {}, [className])}>
            <ArticleDetailsHeader />
            <ArticleDetails id={id} />
            <ArticleRecommendationsList />
            <ArticleComments id={id} />
        </Page>
    );
});

export default ArticleDetailsPage;
