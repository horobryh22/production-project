import { ReactNode } from 'react';

import type { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { TestProvider } from '../providers';

export interface RenderComponentOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

/* Используется для тестирования компонент в среде jest (React Testing Library) */

export const renderComponent = (
    component: ReactNode,
    options: RenderComponentOptions = {},
) => {
    return render(<TestProvider options={options}>{component}</TestProvider>);
};
