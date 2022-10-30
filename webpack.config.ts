import path from 'path';

import { Configuration } from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv): Configuration => {
    const PORT = env.port || 3000;

    const PATHS: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        build: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src'),
    };

    const MODE: BuildMode = env.mode || 'development';
    const IS_DEV = MODE === 'development';
    const ANALYZE = env.analyze || false;
    const URL = env.apiUrl || 'http://localhost:8000';

    return buildWebpackConfig({
        port: PORT,
        isDev: IS_DEV,
        mode: MODE,
        paths: PATHS,
        analyze: ANALYZE,
        apiUrl: URL,
        project: 'frontend',
    });
};
