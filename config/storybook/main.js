module.exports = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    staticDirs: ['../../public'],
    addons: [
        'storybook-addon-themes',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
    features: {
        storyStoreV7: false,
    },
};
