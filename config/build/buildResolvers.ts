import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { ResolveOptions } from 'webpack';

import { BuildOptions } from './types/config';

export function buildResolvers({ paths }: BuildOptions): ResolveOptions {
    return {
        // files that don't need to add an extension when imported, such as '.js' or '.ts'
        extensions: ['.tsx', '.ts', '.js'],
        // we say that we prefer absolute paths
        preferAbsolute: true,
        // public API name file
        mainFiles: ['index'],
        // paths to src and node_modules files
        modules: [paths.src, 'node_modules'],
        // import without @, like '@/something/'
        alias: {},
        plugins: [new TsconfigPathsPlugin({})],
    };
}
