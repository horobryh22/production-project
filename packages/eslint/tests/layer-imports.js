'use strict';

// imports
const rule = require('../plugins/eslint-plugin-fsd-plugin/rules/layer-imports');
const RuleTester = require('eslint').RuleTester;

// variables
const ALLOWED_LAYERS_IMPORTS = {
    app: ['pages', 'widgets', 'features', 'shared', 'entities'],
    pages: ['widgets', 'features', 'shared', 'entities'],
    widgets: ['features', 'shared', 'entities'],
    features: ['shared', 'entities'],
    entities: ['shared', 'entities'],
    shared: ['shared'],
};

const options = [
    {
        alias: '@',
        ignoredImportPatterns: [],
    },
];

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('layer-imports', rule, {
    valid: [
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/features/Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
            errors: [],
            options: options,
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/features/Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
            errors: [],
            options: options,
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/app/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
            errors: [],
            options: options,
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/widgets/pages',
            code: "import { useLocation } from 'react-router-dom'",
            errors: [],
            options: options,
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/app/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
            errors: [],
            options: options,
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/index.tsx',
            code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
            errors: [],
            options: options,
        },
        // тест кейсы ниже говорят о том, что какие-то данные (допустим тестовые) мы можем
        // импортировать, нарушая архитектуру fsd
        {
            filename: 'C/Users/tim/Desktop/javascript/production_project/src/entities/Article.tsx',
            code: "import { StateSchema } from '@/app/providers/StoreProvider'",
            errors: [],
            options: [
                {
                    alias: '@',
                    // означает, что из этой папки мы можем импортировать в любые места проекта
                    ignoredImportPatterns: ['**/StoreProvider']
                }
            ],
        },
        {
            filename: 'C/Users/tim/Desktop/javascript/production_project/src/shared/ui/Tabs/Tabs.stories.tsx',
            code: "import { ArticleType } from '@/entities/Article';",
            errors: [],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.stories.*']
                }
            ],
        },
    ],

    invalid: [
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/entities/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
            errors: [{ message: `Слой может импортировать в себя только разрешенные ниже лежащие слои: ${ALLOWED_LAYERS_IMPORTS["entities"].join(', ')}` }],
            options,
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/features/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
            errors: [{ message: `Слой может импортировать в себя только разрешенные ниже лежащие слои: ${ALLOWED_LAYERS_IMPORTS["features"].join(', ')}` }],
            options,
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/production_project/src/entities/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
            errors: [{ message: `Слой может импортировать в себя только разрешенные ниже лежащие слои: ${ALLOWED_LAYERS_IMPORTS["entities"].join(', ')}` }],
            options,
        },
        {
            filename: 'C/Users/tim/Desktop/javascript/production_project/src/shared/ui/Tabs/Tabs.stories.tsx',
            code: "import { ArticleType } from '@/entities/Article';",
            errors: [{ message: `Слой может импортировать в себя только разрешенные ниже лежащие слои: ${ALLOWED_LAYERS_IMPORTS["shared"].join(', ')}` }],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: []
                }
            ],
        },
    ],
});
