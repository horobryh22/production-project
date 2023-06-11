import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { selectArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { selectAuthData } from '@/entities/User';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetailsComments/addCommentForArticle',
    async (text, { rejectWithValue, getState, extra }) => {
        const authUserData = selectAuthData(getState());
        const articleData = selectArticleDetailsData(getState());

        if (!authUserData || !articleData) {
            return rejectWithValue('no data');
        }

        try {
            const { data } = await extra.api.post<Comment>('/comments', {
                text,
                articleId: articleData?.id,
                userId: authUserData.id,
            });

            if (!data) {
                throw new Error('no data');
            }

            const comment: Comment = {
                user: authUserData,
                articleId: articleData?.id,
                text,
                id: data.id,
            };

            return comment;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
