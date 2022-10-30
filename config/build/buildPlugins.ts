import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
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
    const plugins = [
        // it shows us progress of build files
        new webpack.ProgressPlugin(),
        // create html file and link scripts
        new HtmlWebpackPlugin({
            // we told webpack which html file will be sample
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        // this plugin gives access to variables what announced inside it
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        // these plugins Refresh and HotModule are included so as not to reload our page
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshPlugin(),
    ];

    if (analyze) plugins.push(new BundleAnalyzerPlugin());

    return plugins;
}
