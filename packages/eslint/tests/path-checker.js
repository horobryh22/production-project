"use strict";

const rule = require("../plugins/eslint-plugin-fsd-plugin/rules/path-checker");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parserOptions: {ecmaVersion: 2020, sourceType: 'module'}
});

ruleTester.run("path-checker", rule, {
    valid: [
        {
            code: "import { Article } from '../../../Article';",
            filename: 'src\\entities\\Article\\ui\\ArticleDetails\\ArticleDetails.stories.tsx'
        },
        {
            code: "import { Portal } from 'shared/ui';",
            filename:  'src/shared/ui/Modal/Modal.tsx'
        },
        {
            code: "import { Portal } from '@/shared/ui';",
            filename:  'src/shared/ui/Modal/Modal.tsx',
            options: [{alias: '@'}]
        },
    ],

    invalid: [
        {
            code: "import { Article } from 'entities/Article';",
            errors: [{ message: "In this case path should be relative" }],
            filename: 'src/entities/Article/ui/ArticleDetails/ArticleDetails.stories.tsx'
        },
        {
            code: "import { fetchCommentsByArticleId } from 'features/ArticleComments/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';",
            errors: [{ message: "In this case path should be relative" }],
            filename: 'src/features/ArticleComments/ui/ArticleComments/ArticleComments.tsx'
        },
        {
            code: "import { fetchCommentsByArticleId } from '@/features/ArticleComments/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';",
            errors: [{ message: "In this case path should be relative" }],
            filename: 'src/features/ArticleComments/ui/ArticleComments/ArticleComments.tsx',
            options: [{alias: '@'}]
        }
    ]
});
