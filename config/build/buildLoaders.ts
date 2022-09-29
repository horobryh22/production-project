import {RuleSetRule} from 'webpack';

export function buildLoaders(): RuleSetRule[] {

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

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
        tsLoader,
        cssLoader
    ];
}