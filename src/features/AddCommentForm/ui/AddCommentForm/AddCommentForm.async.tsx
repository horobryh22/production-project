import { FC, lazy } from 'react';

import { AddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(async () => {
    return await new Promise(resolve => setTimeout(resolve, 1500)).then(
        async () => await import('./AddCommentForm'),
    );
});
