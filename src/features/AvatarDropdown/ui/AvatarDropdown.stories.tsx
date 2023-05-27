import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AvatarDropdown } from './AvatarDropdown';

import { UserRole } from 'entities/User';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = args => (
    <AvatarDropdown {...args} />
);

export const UserAdmin = Template.bind({});
UserAdmin.decorators = [
    StoreDecorator({
        user: {
            authData: {
                roles: [UserRole.ADMIN],
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
            },
        },
    }),
];

export const SimpleUser = Template.bind({});
SimpleUser.decorators = [
    StoreDecorator({
        user: {
            authData: {
                roles: [],
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
            },
        },
    }),
];
