import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Loader as LoaderComponent } from './Loader';

export default {
    title: 'shared/Loader',
    component: LoaderComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoaderComponent>;

const Template: ComponentStory<typeof LoaderComponent> = args => (
    <LoaderComponent {...args} />
);

export const Loader = Template.bind({});
