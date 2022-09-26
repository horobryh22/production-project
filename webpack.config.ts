import path from 'path';
import {BuildMode, BuildPaths} from './config/build/types/config';
import {buildWebpackConfig} from './config/build/buildWebpackConfig';

const PORT = 3000;

const PATHS: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    build: path.resolve(__dirname, 'build')
}

const MODE: BuildMode = 'development';
const IS_DEV = MODE === 'development';

const webpackConfig = buildWebpackConfig({
    port: PORT,
    isDev: IS_DEV,
    mode: MODE,
    paths: PATHS
});

export default webpackConfig;
