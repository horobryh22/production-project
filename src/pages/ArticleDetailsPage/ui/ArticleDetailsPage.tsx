import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import classes from './ArticleDetailsPage.module.scss';

import { ArticleDetails } from 'entities/Article';
import { CommentsList } from 'entities/Comment';
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
            <Text
                className={classes.commentTitle}
                title={t('Comments', { ns: 'article' })}
            />
            <CommentsList
                comments={[
                    {
                        user: {
                            id: '1',
                            username: 'admin',
                            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
                        },
                        text: 'some comment',
                        articleId: '1',
                        id: '1',
                    },
                    {
                        user: {
                            id: '1',
                            username: 'admin',
                            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
                        },
                        text: 'some comment',
                        articleId: '1',
                        id: '1',
                    },
                ]}
            />
        </div>
    );
});

export default ArticleDetailsPage;
