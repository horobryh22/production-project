import {RuleSetRule} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BuildOptions} from './types/config';

export function buildLoaders({isDev}: BuildOptions): RuleSetRule[] {

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

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: 'css-loader',
                // added opportunity to use .module.scss
                options: {
                    modules: {
                        // do it to files without '.module.' won't compile into base64 format, like 'AfdfWeRGwrg'
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        // change classNames, depends on mode (dev or prod)
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]'
                    }
                }
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };

    // if we don't use typescript, we need to use babel-loader
    const tsLoader = {
        // we say which type of files loader will handle
        test: /\.tsx?$/,
        // which loader will handle files
        use: 'ts-loader',
        // what doesn't need to handle
        exclude: /node_modules/,
    }

    // order of loaders is very important!!!
    return [
        fileLoader,
        svgLoader,
        babelLoader,
        tsLoader,
        cssLoader
    ];
}