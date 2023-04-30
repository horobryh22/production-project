module.exports = (str, letterType) => {

    if (letterType === 'upper') {
        return str[0].toUpperCase() + str.slice(1);
    }

    return str[0].toLowerCase() + str.slice(1);
};