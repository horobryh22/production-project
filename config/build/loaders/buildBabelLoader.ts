import { RuleSetRule } from 'webpack';

import { BuildOptions } from '../types/config';

export const buildBabelLoader = ({ isDev }: BuildOptions): RuleSetRule => ({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: [
                [
                    'i18next-extract',
                    {
                        locales: ['en', 'ru'],
                        keyAsDefaultValue: true,
                        saveMissing: true,
                        discardOldKeys: true,
                        outputPath: 'public/locales/{{locale}}/{{ns}}.json',
                    },
                ],
                isDev && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
        },
    },
});
