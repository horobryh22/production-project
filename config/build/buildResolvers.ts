import {ResolveOptions} from 'webpack';


export function buildResolvers(): ResolveOptions {

    return {
        // files that don't need to add an extension when imported, such as '.js' or '.ts'
        extensions: ['.tsx', '.ts', '.js'],
    }
}