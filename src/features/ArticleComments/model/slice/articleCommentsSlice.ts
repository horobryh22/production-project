import { createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { buildSlice } from '@/shared/store/buildSlice';

import { addCommentForArticle } from '../services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleCommentsSchema } from '../types';

const commentAdapter = createEntityAdapter<Comment>({
    selectId: comment => comment?.id,
});

export const commentsSelectors = commentAdapter.getSelectors<StateSchema>(
    state => state.articleDetailsComments || commentAdapter.getInitialState(),
);

export const articleCommentsSlice = buildSlice({
    name: 'articleComments',
    initialState: commentAdapter.getInitialState<ArticleCommentsSchema>({
        isLoading: false,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCommentsByArticleId.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (state, action: PayloadAction<Comment[]>) => {
                    state.isLoading = false;
                    commentAdapter.setAll(state, action.payload);
                },
            )
            .addCase(addCommentForArticle.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addCommentForArticle.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                addCommentForArticle.fulfilled,
                (state, action: PayloadAction<Comment>) => {
                    state.isLoading = false;
                    commentAdapter.setOne(state, action.payload);
                },
            ),
});

export const { reducer: articleCommentsReducer } = articleCommentsSlice;
