import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';

export const buildCssLoader = (isDev: boolean): RuleSetRule => ({
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
        // Creates `style` nodes from JS strings
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        {
            loader: 'css-loader',
            // added opportunity to use .module.scss
            options: {
                modules: {
                    // do it to files without '.module.' won't compile into base64 format, like 'AfdfWeRGwrg'
                    auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                    // change classNames, depends on mode (dev or prod)
                    localIdentName: isDev
                        ? '[path][name]__[local]--[hash:base64:5]'
                        : '[hash:base64:8]',
                },
            },
        },
        // Compiles Sass to CSS
        'sass-loader',
    ],
});
