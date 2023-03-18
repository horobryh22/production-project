"use strict";

const rule = require("../plugins/eslint-plugin-fsd-plugin/rules/path-checker");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("path-checker", rule, {
    valid: [
        {
            code: "const onError = () => {};",
            options: [ 1, {
                "include": ['onError'],
                "exclude": [],
                "message": ""
            } ],
            parserOptions: { ecmaVersion: 2020 },
        }
    ],

    invalid: [
        {
            code: "const selectArticleDetailsError = () => {};",
            errors: [{ message: "Unexpected invalid variable." }],
            parserOptions: { ecmaVersion: 2020 },
        },
    ]
});