import { ReactElement, memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectCanUserEditArticle } from '../../model/selectors/articleDetailsSelectors';

import classes from './ArticleDetailsHeader.module.scss';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { selectArticleDetailsData } from 'entities/Article';
import { classNames } from 'shared/lib';
import { Button } from 'shared/ui';

interface ArticleDetailsHeaderProps {
    className?: string;
}

export const ArticleDetailsHeader = memo(
    (props: ArticleDetailsHeaderProps): ReactElement => {
        const { className } = props;
        const { t } = useTranslation();
        const navigate = useNavigate();

        const canUserEditArticle = useSelector(selectCanUserEditArticle);
        const article = useSelector(selectArticleDetailsData);

        const onBackToArticles = useCallback(() => {
            navigate(RoutePath.articles);
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            navigate(`${RoutePath.articles}/${article?.id}/edit`);
        }, [article?.id, navigate]);

        return (
            <div className={classNames(classes.ArticleDetailsHeader, {}, [className])}>
                <Button onClick={onBackToArticles} className={classes.btn}>
                    {t('Back to articles', { ns: 'article' })}
                </Button>
                {canUserEditArticle && (
                    <Button onClick={onEditArticle} className={classes.btn}>
                        {t('Edit article', { ns: 'article' })}
                    </Button>
                )}
            </div>
        );
    },
);
