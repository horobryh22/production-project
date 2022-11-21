import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const selectArticlePageIsLoading = (state: StateSchema): boolean =>
    state.articlePage?.isLoading || false;

export const selectArticlePageError = (state: StateSchema): string =>
    state.articlePage?.error || '';

export const selectArticlePageView = (state: StateSchema): ArticleView =>
    state.articlePage?.view || ArticleView.TILE;
