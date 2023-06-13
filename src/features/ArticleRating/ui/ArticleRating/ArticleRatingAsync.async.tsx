import { Suspense } from 'react';

import loadable from '@loadable/component';

import { ArticleRatingProps } from './ArticleRating';

import { Skeleton } from '@/shared/ui';

const ArticleRatingLazy = loadable(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense fallback={<Skeleton width={'100%'} height={108} border={'12px'} />}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
