import { StateSchema } from 'app/providers/StoreProvider';

export const selectCommentText = (state: StateSchema) => state.addCommentForm?.text;
