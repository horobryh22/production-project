import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import classes from './ArticleDetailsPage.module.scss';

import { ArticleDetails } from 'entities/Article';
import { classNames } from 'shared/lib';
import { Text } from 'shared/ui';
import { TextTheme } from 'shared/ui/Text/Text';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps): ReactElement | null => {
    const { className } = props;
    const { t } = useTranslation('article');

    let { id } = useParams();

    if (!id && __PROJECT__ === 'storybook') id = '1';

    if (!id) {
        return (
            <div className={classNames(classes.ArticleDetailsPage, {}, [className])}>
                <Text
                    theme={TextTheme.ERROR}
                    text={t('Article not found', { ns: 'article' })}
                />
            </div>
        );
    }

    return (
        <div className={classNames(classes.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
        </div>
    );
});

export default ArticleDetailsPage;
