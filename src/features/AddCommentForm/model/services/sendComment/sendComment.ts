import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectCommentText } from '../../selectors/selectCommentText/selectCommentText';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { selectArticleDetailsData } from 'entities/Article';
import { selectAuthData } from 'entities/User';

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
    'addCommentForm/sendComment',
    async (_, { rejectWithValue, getState, extra }) => {
        const authUserData = selectAuthData(getState());
        const articleData = selectArticleDetailsData(getState());
        const text = selectCommentText(getState());

        if (!authUserData || !text || !articleData) {
            return rejectWithValue('no data');
        }

        try {
            const { data } = await extra.api.post<Comment>('/comments', {
                text,
                articleId: articleData?.id,
                userId: authUserData.id,
            });

            if (!data) {
                throw new Error();
            }

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
