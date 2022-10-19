import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { selectCounterValue } from '../model/selectors/selectCounterValue/selectCounterValue';
import { counterActions } from '../model/slice/counterSlice';

import { Button } from 'shared/ui';

export const Counter = (): ReactElement => {
    const dispatch = useDispatch();
    const counterValue = useSelector(selectCounterValue);
    const { t } = useTranslation();

    const increment = (): void => {
        dispatch(counterActions.increment());
    };
    const decrement = (): void => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="increment-btn" onClick={increment}>
                {t('increment')}
            </Button>
            <Button data-testid="decrement-btn" onClick={decrement}>
                {t('decrement')}
            </Button>
        </div>
    );
};
