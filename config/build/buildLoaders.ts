import { RuleSetRule } from 'webpack';

import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = {
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
                ],
            },
        },
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const cssLoader = buildCssLoader(isDev);

    // if we don't use typescript, we need to use babel-loader
    const tsLoader = {
        // we say which type of files loader will handle
        test: /\.tsx?$/,
        // which loader will handle files
        use: 'ts-loader',
        // what doesn't need to handle
        exclude: /node_modules/,
    };

    // order of loaders is very important!!!
    return [fileLoader, svgLoader, babelLoader, tsLoader, cssLoader];
}
