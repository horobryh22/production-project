import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { StateSchema } from 'app/providers/StoreProvider';

type TypedDispatch = ThunkDispatch<StateSchema, any, AnyAction>;
export const useAppDispatch = (): ReturnType<typeof useDispatch<TypedDispatch>> =>
    useDispatch<TypedDispatch>();
