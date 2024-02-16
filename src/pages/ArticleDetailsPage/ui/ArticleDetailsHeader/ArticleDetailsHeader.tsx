import { ReactElement, memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { classNames } from '@/shared/lib';
import { Button, HStack } from '@/shared/ui';

import { selectCanUserEditArticle } from '../../model/selectors/articleDetailsSelectors';

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
            navigate(getRouteArticles());
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            article?.id && navigate(getRouteArticleEdit(article?.id));
        }, [article?.id, navigate]);

        return (
            <HStack
                justify={'between'}
                align={'center'}
                max
                className={classNames('', {}, [className])}
            >
                <Button onClick={onBackToArticles}>
                    {t('Back to articles', { ns: 'article' })}
                </Button>
                {canUserEditArticle && (
                    <Button onClick={onEditArticle}>
                        {t('Edit article', { ns: 'article' })}
                    </Button>
                )}
            </HStack>
        );
    },
);
