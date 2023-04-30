const changeFirstLetter = require('../helpers/changeFirstLetter');

module.exports = (slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');

    return `.${sliceNameUpperCase} { }
`
};