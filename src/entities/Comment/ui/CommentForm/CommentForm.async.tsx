import loadable from '@loadable/component';

import { CommentFormProps } from './CommentForm';

// TODO занести Suspense во внутрь компонента (сделать аналогично ArticleRating)
// TODO а в идеале вообще переписать все на loadable (чтобы грузилось при скролле вниз)

export const CommentFormAsync = loadable<CommentFormProps>(() => import('./CommentForm'));
