import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import webpack, { RuleSetRule } from 'webpack';
import { BuildPaths } from '../build/types/config';

export default function({ config }: { config: webpack.Configuration }) {
    const paths: BuildPaths = {
        src: path.resolve(__dirname, '..', '..', 'src'),
        entry: '',
        html: '',
        build: '',
    };
    config.resolve.modules.push(paths.src);
    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        },
    );
    config.module.rules.push(buildCssLoader(true));

    return config;
};