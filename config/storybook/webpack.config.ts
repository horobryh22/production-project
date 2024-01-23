import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { BuildPaths } from '../build/types/config';

export default function({ config }: { config: webpack.Configuration }) {
    const paths: BuildPaths = {
        src: path.resolve(__dirname, '..', '..', 'src'),
        entry: '',
        html: '',
        build: '',
        locales: '',
        localesBuild: ''
    };
    config!.resolve!.modules = [paths.src, 'node_modules'];
    config!.resolve!.extensions!.push('.ts', '.tsx');

    config!.module!.rules = config!.module!.rules!.map((rule) => {
        if (typeof rule === 'string') return rule as RuleSetRule;

        if (/svg/.test((rule as RuleSetRule).test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        },
    );
    config!.module!.rules.push(buildCssLoader(true));

    config!.plugins!.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook')
    }));

    config!.resolve!.alias = {
        '@': paths.src
    }

    return config;
};
