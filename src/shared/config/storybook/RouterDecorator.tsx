import { ReactElement } from 'react';

import type { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryComponent: Story): ReactElement => {
    return (
        <BrowserRouter>
            <StoryComponent />
        </BrowserRouter>
    );
};
