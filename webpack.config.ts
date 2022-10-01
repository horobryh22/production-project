import path from 'path';
import {BuildMode, BuildPaths, BuildEnv} from './config/build/types/config';
import {buildWebpackConfig} from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {

    const PORT = env.port || 3000;

    const PATHS: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        build: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src')
    }

    const MODE: BuildMode = env.mode || 'development';
    const IS_DEV = MODE === 'development';

    return buildWebpackConfig({
        port: PORT,
        isDev: IS_DEV,
        mode: MODE,
        paths: PATHS
    });
};
