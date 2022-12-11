export type BuildMode = 'production' | 'development';

export interface BuildEnv {
    port: number;
    mode: BuildMode;
    analyze: boolean;
    apiUrl: string;
}

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    localesBuild: string;
}

export interface BuildOptions {
    mode: BuildMode;
    port: number;
    paths: BuildPaths;
    isDev: boolean;
    analyze: boolean;
    apiUrl: string;
    project: 'storybook' | 'jest' | 'frontend';
}
