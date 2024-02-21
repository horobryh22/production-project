import { Configuration } from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { mode, paths, isDev } = options;

    return {
        // development || production
        mode,
        // start point of our app
        entry: paths.entry,
        module: {
            // configure loaders here, loaders handle files like 'png', 'jpeg', 'svg', 'css', 'ts' and more
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        // settings where we'll build our app
        output: {
            // name of the main file of our app
            // add contenthash to browser get new file every time
            filename: '[name].[contenthash].js',
            // in which directory will be our build
            path: paths.build,
            // remove unused bundles
            clean: true,
            // added this to work the following "someurl/article/ => (1) <="
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    };
}
