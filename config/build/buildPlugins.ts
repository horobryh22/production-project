import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';


export function buildPlugins({
    paths,
    isDev,
    analyze,
    apiUrl,
    project,
}: BuildOptions): WebpackPluginInstance[] {
    const isProd = !isDev;

    const plugins = [
        // it shows us progress of build files
        new webpack.ProgressPlugin(),
        // create html file and link scripts
        new HtmlWebpackPlugin({
            // we told webpack which html file will be sample
            template: paths.html,
        }),
        // this plugin gives access to variables what announced inside it
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ];

    if (isDev) {
        // these plugins Refresh and HotModule are included so as not to reload our page
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new ReactRefreshPlugin());
        plugins.push(
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
            }),
        );
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        );
        plugins.push(
            // this plugin needs for copy locales to production build
            new CopyPlugin({
                patterns: [{ from: paths.locales, to: paths.localesBuild }],
            }),
        );
    }

    if (analyze) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}
