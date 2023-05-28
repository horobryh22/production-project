import loadable from '@loadable/component';

import { CommentFormProps } from './CommentForm';

export const CommentFormAsync = loadable<CommentFormProps>(() => import('./CommentForm'));
