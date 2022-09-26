import {RuleSetRule} from 'webpack';

export function buildLoaders(): RuleSetRule[] {

    const tsLoader = {
        // we say which type of files loader will handle
        test: /\.tsx?$/,
        // which loader will handle files
        use: 'ts-loader',
        // what doesn't need to handle
        exclude: /node_modules/,
    }

    return [
        tsLoader
    ];
}