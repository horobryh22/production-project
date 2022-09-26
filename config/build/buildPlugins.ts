import webpack, {WebpackPluginInstance} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {BuildOptions} from './types/config';


export function buildPlugins({paths}: BuildOptions): WebpackPluginInstance[] {

    return [
        // it shows us progress of build files
        new webpack.ProgressPlugin(),
        // create html file and link scripts
        new HtmlWebpackPlugin({
            // we told webpack which html file will be sample
            template: paths.html
        }),
    ];
}