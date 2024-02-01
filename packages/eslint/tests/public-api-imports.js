"use strict";

// imports
const rule = require("../plugins/eslint-plugin-fsd-plugin/rules/public-api-imports");
const RuleTester = require("eslint").RuleTester;

// variables
const options =  [{alias: '@'}];

const ruleTester = new RuleTester({
    parserOptions: {ecmaVersion: 2020, sourceType: 'module'}
});

ruleTester.run("public-api-imports", rule, {
    valid: [
        {
            code: "import { Article } from '../../../Article';",
            options
        },
        {
            code: "import { Portal } from '@/shared/ui';",
            options
        },
        {
            code: "import { ArticleComments } from '@/features/ArticleComments';",
            options
        },
        {
            code: "import { useSelector } from 'react-redux/src/hooks/useSelector';",
            options
        },
    ],

    invalid: [
        {
            code: "import { ArticleComments } from '@/features/ArticleComments/CommentForm';",
            errors: [{ message: 'Импорт должен происходить только из Public API (index.ts)' }],
            options
        },
    ]
});
