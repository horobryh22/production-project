import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectCommentText } from '../../model/selectors/selectCommentText/selectCommentText';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import classes from './AddCommentForm.module.scss';

import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Button, HStack, Input } from 'shared/ui';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
    isLoading?: boolean;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(
    ({ className, onSendComment, isLoading }: AddCommentFormProps): ReactElement => {
        const { t } = useTranslation('profile');
        const dispatch = useAppDispatch();

        const text = useSelector(selectCommentText);

        const onChangeComment = useCallback(
            (value: string): void => {
                dispatch(addCommentFormActions.changeText(value));
            },
            [dispatch],
        );

        const handleSendComment = useCallback(() => {
            onSendComment(text || '');
            dispatch(addCommentFormActions.changeText(''));
        }, [dispatch, onSendComment, text]);

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

export default AddCommentForm;
