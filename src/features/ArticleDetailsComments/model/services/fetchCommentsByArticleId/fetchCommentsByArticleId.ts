import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment,
    string | undefined,
    ThunkConfig<string>
>('comment/fetchCommentsByArticleId', async (articleId, { rejectWithValue, extra }) => {
    try {
        if (!articleId) {
            return rejectWithValue('error');
        }

        const { data } = await extra.api.get<Comment>('/comments', {});

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
