import {BuildOptions} from './types/config';
import {Configuration} from 'webpack';
import {buildLoaders} from './buildLoaders';
import {buildResolvers} from './buildResolvers';
import {buildPlugins} from './buildPlugins';
import {buildDevServer} from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): Configuration {

    const {mode, paths, isDev} = options;

    return {
        // development || production
        mode,
        // start point of our app
        entry: paths.entry,
        module: {
            // configure loaders here, loaders handle files like 'png', 'jpeg', 'svg', 'css', 'ts' and more
            rules: buildLoaders()
        },
        resolve: buildResolvers(),
        // settings where we'll build our app
        output: {
            // name of the main file of our app
            // add contenthash to browser get new file every time
            filename: '[name].[contenthash].js',
            // in which directory will be our build
            path: paths.build,
            // remove unused bundles
            clean: true
        },
        plugins: buildPlugins(options),
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev ? 'inline-source-map' : undefined,
    }
}