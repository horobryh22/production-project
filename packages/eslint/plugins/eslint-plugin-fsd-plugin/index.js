const pathCheckerRule = require("./rules/path-checker");
const publicApiImportsRule = require("./rules/public-api-imports");
const layerImportsRule = require("./rules/layer-imports");

module.exports = {
    rules: {
        'path-checker': pathCheckerRule,
        'public-api-imports': publicApiImportsRule,
        'layer-imports': layerImportsRule,
    },
};
