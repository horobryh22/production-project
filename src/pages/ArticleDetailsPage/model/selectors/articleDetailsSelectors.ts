import { createSelector } from 'reselect';

import { selectArticleDetailsData } from '@/entities/Article';
import { selectAuthData } from '@/entities/User';

export const selectCanUserEditArticle = createSelector(
    selectAuthData,
    selectArticleDetailsData,
    (userData, articleData) => userData.id === articleData?.user?.id,
);
