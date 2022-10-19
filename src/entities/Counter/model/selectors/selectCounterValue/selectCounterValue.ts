import { createSelector } from 'reselect';

import { selectCounter } from '../selectCounter/selectCounter';

export const selectCounterValue = createSelector(selectCounter, counter => counter.value);
