import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        // to fix 'cannot get' mistake after update page
        historyApiFallback: true,
        port: options.port,
        open: true,
    };
}
