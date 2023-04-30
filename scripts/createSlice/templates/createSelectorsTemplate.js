const changeFirstLetter = require('../helpers/changeFirstLetter');

module.exports = (slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');

    return `import { StateSchema } from 'app/providers/StoreProvider';

export const select${sliceNameUpperCase}Data = (state: StateSchema) => state;

export const select${sliceNameUpperCase}Error = (state: StateSchema) => state;

export const select${sliceNameUpperCase}IsLoading = (state: StateSchema) => state;
`
};