import { Directory, ExportDeclaration, Project } from 'ts-morph';

const path = require('path');
const micromatch = require('micromatch');

const project = new Project();

// helpers
const getMatchingExports = (indexExports?: ExportDeclaration[], pattern?: string): string[] => {
    if (!indexExports || !pattern) {
        return [];
    }

    return indexExports
        ?.filter(el => micromatch.contains(el.getModuleSpecifierValue(), pattern))
        ?.flatMap(el => el.getNamedExports().flatMap(el => el.getName().split(',')));
};

const getItemsList = (layerDirs: Directory[], layerName: string) => {
    return layerDirs
        .map(dir => {
            const baseName = dir.getBaseName();

            return `- [${baseName}](/src/${layerName}/${baseName})\n`;
        })
        .join('');
};

const getPublicAPIExportItems = (list: string[], baseName?: string) => {
    return list
        ?.map((item, i, arr) => {
            const isLastItem = arr.length - 1 === i;
            const isDefaultExport = item === 'default';
            const finalName = isDefaultExport && baseName ? baseName : item

            return isLastItem ? `\`${finalName}\`` : `\`${finalName}\`\n\n`;
        })
        .join('');
};

// сначала добавляем все типы файлов, которые буду обрабатываться
project.addSourceFilesAtPaths([
    '**/*.md',
    'src/**/*.ts',
    'src/**/*.tsx',
]);

const entityPath = path.resolve(__dirname, '..', 'src', 'entities');
const featurePath = path.resolve(__dirname, '..', 'src', 'features');
const readmeMdPath = path.resolve(__dirname, '..', 'README.md');

const entityDir = project.getDirectory(entityPath);
const featureDir = project.getDirectory(featurePath);

const mainReadmeMd = project.getSourceFile(readmeMdPath);

const entities = entityDir?.getDirectories() ?? [];
const features = featureDir?.getDirectories() ?? [];

[...entities, ...features].forEach(async directory => {
    const sourceFilePath = `${directory.getPath()}/README.md`;
    const isEntity = sourceFilePath.includes('entities');
    const baseName = directory.getBaseName();

    const files = directory.getSourceFiles();

    const mdFile = files.find(file => file.getExtension() === '.md');
    const indexFile = files.find(file => file.getBaseNameWithoutExtension() === 'index');

    const indexExports = indexFile?.getExportDeclarations();

    // экпорты, разбитые на конкретные группы
    const types = getMatchingExports(indexExports, '**/types/**');
    const selectors = getMatchingExports(indexExports, '**/selectors/**');
    const consts = getMatchingExports(indexExports, '**/consts/**');
    const ui = getMatchingExports(indexExports, '**/ui/**');

    // шаблон текста
    const textTemplate = `## ${isEntity ? 'Сущность' : 'Фича'} \`${baseName}\`

Описание: 

#### Public api

- Components

${getPublicAPIExportItems(ui, baseName)}

- Types

${getPublicAPIExportItems(types)}

- Selectors

${getPublicAPIExportItems(selectors)}

- Constants

${getPublicAPIExportItems(consts)}`;

    if (!mdFile) {
        const sourceFile = directory.createSourceFile(sourceFilePath, textTemplate, { overwrite: true });

        await sourceFile.save();
    } else {
        mdFile?.replaceWithText(textTemplate);

        await mdFile?.save();
    }
});

// добавляем фичи и сущности в Readme.md проекта
const readmeMdText = mainReadmeMd?.getText();
const startIndex = readmeMdText?.indexOf('## Сущности (entities)');
const replacedText = readmeMdText?.slice(0, startIndex);
const insertedText = `## Сущности (entities)

${getItemsList(entities, 'entities')}  
## Фичи (features)

${getItemsList(features, 'features')}  
`;

mainReadmeMd?.replaceWithText(replacedText + insertedText);

mainReadmeMd?.save();

project.save();
