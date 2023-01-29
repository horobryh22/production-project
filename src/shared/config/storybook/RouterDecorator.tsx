import { ReactElement, ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (story: () => ReactNode): ReactElement => {
    return <BrowserRouter>{story()}</BrowserRouter>;
};
