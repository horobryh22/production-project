import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { withThemes } from 'storybook-addon-themes/react';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    themes: {
        default: 'light',
        list: [
            { name: 'dark', class: ['app', 'dark'] },
            { name: 'light', class: ['app', 'light'] },
        ],
    },
};

addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(withThemes);