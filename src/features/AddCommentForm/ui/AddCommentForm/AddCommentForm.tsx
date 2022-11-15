import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectCommentIsLoading } from '../../model/selectors/selectCommentIsLoading/selectCommentIsLoading';
import { selectCommentText } from '../../model/selectors/selectCommentText/selectCommentText';
import { sendComment } from '../../model/services/sendComment/sendComment';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import classes from './AddCommentForm.module.scss';

import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { Button, Input } from 'shared/ui';

export interface AddCommentFormProps {
    className?: string;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(({ className }: AddCommentFormProps): ReactElement => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

    const text = useSelector(selectCommentText);
    const isLoading = useSelector(selectCommentIsLoading);

    const onSendComment = useCallback(async (): Promise<void> => {
        const { meta } = await dispatch(sendComment());

        if (meta.requestStatus === 'fulfilled') {
            dispatch(addCommentFormActions.changeText(''));
        }
    }, [dispatch]);

    const onChangeComment = useCallback(
        (value: string): void => {
            dispatch(addCommentFormActions.changeText(value));
        },
        [dispatch],
    );

    useDynamicModuleLoader(reducers);

    return (
        <div className={classNames(classes.AddCommentForm, {}, [className])}>
            <Input
                className={classes.input}
                value={text || ''}
                placeholder={t('Введите текст комментария', {
                    ns: 'profile',
                })}
                onChange={onChangeComment}
            />
            <Button onClick={onSendComment} disabled={isLoading}>
                {t('Отправить', {
                    ns: 'profile',
                })}
            </Button>
        </div>
    );
});

export default AddCommentForm;
