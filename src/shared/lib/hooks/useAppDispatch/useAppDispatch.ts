import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { StateSchema, ThunkExtraArgs } from '@/app/providers/StoreProvider';

type TypedDispatch = ThunkDispatch<StateSchema, ThunkExtraArgs, AnyAction>;
export const useAppDispatch = (): ReturnType<typeof useDispatch<TypedDispatch>> =>
    useDispatch<TypedDispatch>();
