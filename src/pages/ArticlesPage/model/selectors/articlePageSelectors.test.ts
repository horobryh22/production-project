import type { DeepPartial } from 'redux';

import {
    selectArticlePageError,
    selectArticlePageHasMore,
    selectArticlePageInited,
    selectArticlePageIsLoading,
    selectArticlePageLimitNum,
    selectArticlePagePageNum,
    selectArticlePageView,
} from '../selectors/articlePageSelectors';

import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

describe('articlePageSelectors.test', () => {
    let state: DeepPartial<StateSchema>;

    beforeEach(() => {
        state = {
            articlePage: {
                page: 3,
                view: ArticleView.LIST,
                isLoading: true,
                hasMore: false,
                limit: 8,
                ids: [],
                entities: {},
                _inited: true,
            },
        };
    });

    test('selectArticlePageIsLoading', () => {
        const isLoading = selectArticlePageIsLoading(state as StateSchema);

        expect(isLoading).toBeTruthy();
    });

    test('selectArticlePageHasMore', () => {
        const hasMore = selectArticlePageHasMore(state as StateSchema);

        expect(hasMore).toBeFalsy();
    });

    test('selectArticlePageLimit', () => {
        const limit = selectArticlePageLimitNum(state as StateSchema);

        expect(limit).toBe(8);
    });

    test('selectArticlePagePageNum', () => {
        const page = selectArticlePagePageNum(state as StateSchema);

        expect(page).toBe(3);
    });

    test('selectArticlePageView', () => {
        const view = selectArticlePageView(state as StateSchema);

        expect(view).toBe(ArticleView.LIST);
    });

    test('selectArticlePageError', () => {
        const error = selectArticlePageError(state as StateSchema);

        expect(error).toBeUndefined();
    });

    test('selectArticlePageInited', () => {
        const _inited = selectArticlePageInited(state as StateSchema);

        expect(_inited).toBeTruthy();
    });
});
