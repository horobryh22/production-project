import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import classes from './ArticleDetailsPage.module.scss';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { ArticleDetails } from 'entities/Article';
import { ArticleComments } from 'features/ArticleDetailsComments';
import { classNames } from 'shared/lib';
import { Button, Text } from 'shared/ui';
import { TextTheme } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps): ReactElement => {
    const { className } = props;
    const { t } = useTranslation('article');

    const navigate = useNavigate();

    let { id } = useParams();

    if (!id && __PROJECT__ === 'storybook') id = '1';

    const onBackToArticles = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

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
            <Button onClick={onBackToArticles} className={classes.btn}>
                {t('Back to articles', { ns: 'article' })}
            </Button>
            <ArticleDetails id={id} />
            <Text
                className={classes.commentTitle}
                title={t('Comments', { ns: 'article' })}
            />
            <ArticleComments id={id} />
        </Page>
    );
});

export default ArticleDetailsPage;
