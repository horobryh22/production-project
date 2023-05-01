const changeFirstLetter = require('../helpers/changeFirstLetter');

module.exports = (slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');

    return `export { ${sliceNameUpperCase}Schema } from './model/types';
export { ${sliceNameUpperCase} } from './ui/${sliceNameUpperCase}/${sliceNameUpperCase}';
`
};