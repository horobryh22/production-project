import { ReactElement, Suspense } from 'react';

import type { Story } from '@storybook/react';

import { Loader } from 'shared/ui';

export const SuspenseDecorator = (StoryComponent: Story): ReactElement => {
    return (
        <Suspense fallback={<Loader className="suspense-loader" />}>
            <StoryComponent />
        </Suspense>
    );
};
