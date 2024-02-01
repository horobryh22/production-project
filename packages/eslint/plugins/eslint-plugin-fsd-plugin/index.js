const pathCheckerRule = require("./rules/path-checker");
const publicApiImportsRule = require("./rules/public-api-imports");

module.exports = {
    rules: {
        'path-checker': pathCheckerRule,
        'public-api-imports': publicApiImportsRule
    },
};
