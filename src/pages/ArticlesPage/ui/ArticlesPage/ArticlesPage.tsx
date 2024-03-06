import { memo, MutableRefObject, ReactElement, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import {
    ArticleInfiniteList,
    fetchNextArticlesPage,
} from '@/features/ArticleInfiniteList';
import { ArticlesFilterBlock } from '@/features/ArticlesPageFilter';
import { classNames, useAppDispatch } from '@/shared/lib';
import { Page } from '@/widgets/Page';
import { selectViewSwitcherView, ViewSwitcher } from '@/widgets/ViewSwitcher';

import classes from './ArticlesPage.module.scss';

interface ArticlePageProps {
    className?: string;
}

const ArticlesPage = memo((props: ArticlePageProps): ReactElement => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const [scrollPageRef, setScrollPageRef] = useState<
        MutableRefObject<HTMLDivElement> | undefined
    >(undefined);

    const view = useSelector(selectViewSwitcherView);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <Page
            data-testid={'ArticlesPage'}
            onScrollEnd={onLoadNextPart}
            setScrollPageRef={setScrollPageRef}
            className={classNames('', {}, [className])}
        >
            <ViewSwitcher className={classes.viewSwitcher} />
            <ArticlesFilterBlock />
            <ArticleInfiniteList
                className={classes.articlesList}
                scrollPageRef={scrollPageRef}
                view={view}
            />
        </Page>
    );
});

export default ArticlesPage;
