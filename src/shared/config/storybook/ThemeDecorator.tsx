import { ReactElement } from 'react';

import type { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator =
    () =>
    (story: () => StoryFnReactReturnType): ReactElement => {
        return <ThemeProvider>{story()}</ThemeProvider>;
    };
