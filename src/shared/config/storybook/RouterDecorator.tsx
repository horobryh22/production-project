import { ReactElement } from 'react';

import type { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (story: () => Story): ReactElement => {
    return <BrowserRouter>{story()}</BrowserRouter>;
};
