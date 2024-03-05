import 'loki/configure-react';
import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import { withThemes } from 'storybook-addon-themes/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    themes: {
        default: 'dark',
        list: [
            { name: 'dark', class: ['app', 'app_dark_theme'], color: '#0606e7' },
            { name: 'light', class: ['app', 'app_light_theme'], color: '#e5e5ef' },
            { name: 'purple', class: ['app', 'app_purple_theme'], color: '#d07ee5' },
        ],
    },
    layout: 'fullscreen', // чтобы не было паддингов в окне интерфейса сторибук
};

addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
addDecorator(mswDecorator);
addDecorator(withThemes);
