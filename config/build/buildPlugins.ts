import webpack, {WebpackPluginInstance} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {BuildOptions} from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


export function buildPlugins({paths}: BuildOptions): WebpackPluginInstance[] {

    return [
        // it shows us progress of build files
        new webpack.ProgressPlugin(),
        // create html file and link scripts
        new HtmlWebpackPlugin({
            // we told webpack which html file will be sample
            template: paths.html
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
    ];
}