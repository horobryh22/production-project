import { RuleSetRule } from 'webpack';

import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BabelLoaderBuildOptions extends BuildOptions {
    isTsx?: boolean;
}
export const buildBabelLoader = ({
    isDev,
    isTsx,
}: BabelLoaderBuildOptions): RuleSetRule => ({
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts|)$/,
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
                [
                    '@babel/plugin-transform-typescript',
                    {
                        isTSX: isTsx,
                    },
                ],
                ['@babel/plugin-transform-runtime'],
                !isDev &&
                    isTsx && [
                        babelRemovePropsPlugin,
                        {
                            props: ['data-testid'],
                        },
                    ],
                isDev && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
        },
    },
});
