"use strict";

const rule = require("../plugins/eslint-plugin-fsd-plugin/rules/path-checker");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("path-checker", rule, {
    valid: [
        {
            code: "import { Article } from '../../../Article';",
            parserOptions: {
                sourceType: "module",
                ecmaVersion: 2020
            },
            filename: 'src/entities/Article/ui/ArticleDetails/ArticleDetails.stories.tsx'
        },
        {
            code: "import { Portal } from 'shared/ui';",
            parserOptions: {
                sourceType: "module",
                ecmaVersion: 2020
            },
            filename: 'src/shared/ui/Modal/Modal.tsx'
        }
    ],

    invalid: [
        {
            code: "import { Article } from 'entities/Article';",
            errors: [{ message: "In this case path should be relative" }],
            parserOptions: {
                sourceType: "module",
                ecmaVersion: 2020
            },
            filename: 'src/entities/Article/ui/ArticleDetails/ArticleDetails.stories.tsx'
        },
    ]
});