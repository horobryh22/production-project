import { ReactElement, memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib';
import { Page } from '@/widgets/Page';

import classes from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps): ReactElement => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(classes.ArticleEditPage, {}, [className])}>
            {isEdit
                ? t('Edit Article', { ns: 'article' })
                : t('Create Article', { ns: 'article' })}
        </Page>
    );
});

export default ArticleEditPage;
