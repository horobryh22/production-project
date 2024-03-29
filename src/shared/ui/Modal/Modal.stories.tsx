import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from './Modal';

// TODO доработать везде истории с modal (сейчас не работают стили нигде)
export default {
    title: 'shared/Modal',
    component: Modal,
    args: {
        children: 'Hello everyone',
        testMode: true,
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = args => <Modal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    isOpen: true,
};
