import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames, useDynamicModuleLoader } from '@/shared/lib';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Button, HStack, Input } from '@/shared/ui';

import { selectCommentText } from '../../model/selectors/selectCommentText/selectCommentText';
import {
    commentFormReducer,
    useCommentFormActions,
} from '../../model/slice/commentFormSlice';

import classes from './CommentForm.module.scss';

export interface CommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
    isLoading?: boolean;
}

const reducers: ReducersList = {
    commentForm: commentFormReducer,
};

export const CommentForm = memo(
    ({ className, onSendComment, isLoading }: CommentFormProps): ReactElement => {
        const { changeText } = useCommentFormActions();
        const { t } = useTranslation('article');

        const text = useSelector(selectCommentText);

        const onChangeComment = useCallback(
            (value: string): void => {
                changeText(value);
            },
            [changeText],
        );

        const handleSendComment = useCallback(() => {
            onSendComment(text || '');
            changeText('');
        }, [changeText, onSendComment, text]);

        useDynamicModuleLoader(reducers);

        return (
            <HStack
                max
                justify={'between'}
                className={classNames(classes.AddCommentForm, {}, [className])}
            >
                <Input
                    disabled={isLoading}
                    className={classes.input}
                    value={text || ''}
                    placeholder={t('Введите текст комментария', {
                        ns: 'profile',
                    })}
                    onChange={onChangeComment}
                />
                <Button onClick={handleSendComment} disabled={isLoading}>
                    {t('Отправить', {
                        ns: 'profile',
                    })}
                </Button>
            </HStack>
        );
    },
);
