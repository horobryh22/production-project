'use strict';

// imports
const rule = require('../plugins/eslint-plugin-fsd-plugin/rules/public-api-imports');
const RuleTester = require('eslint').RuleTester;
const {testingReport, publicApiReport} = require('../plugins/eslint-plugin-fsd-plugin/consts');

// variables
const options = [
    {
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
    },
];

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('public-api-imports', rule, {
    valid: [
        {
            code: 'import { Article } from \'../../../Article\';',
            options,
        },
        {
            code: 'import { Portal } from \'@/shared/ui\';',
            options,
        },
        {
            code: 'import { ArticleComments } from \'@/features/ArticleComments\';',
            options,
        },
        {
            code: 'import { useSelector } from \'react-redux/src/hooks/useSelector\';',
            options,
        },
        {
            code: "import { articleDetailsReducer } from '@/entities/Article/testing';",
            filename:  'src/api/decorators/StoreDecorator/StoreDecorator.tsx',
            options,
        },
    ],

    invalid: [
        {
            code: 'import { ArticleComments } from \'@/features/ArticleComments/CommentForm\';',
            errors: [{ messageId: publicApiReport }],
            output: "import { ArticleComments } from '@/features/ArticleComments';", // значение, которое ожидаем увидеть после автофикса
            options,
        },
        {
            code: "import { articleDetailsReducer } from '@/entities/Article/testing';",
            filename:  'src/shared/ui/Modal/Modal.tsx',
            errors: [{ messageId: testingReport }],
            options,
        },
    ],
});
