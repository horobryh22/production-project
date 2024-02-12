import { Project } from 'ts-morph';

const path = require('path');
const project = new Project();

// при запуске скрипта можно вытащить аругменты, для которых можно сделать исключения
console.log({ args: process.argv });

// сначала добавляем все типы файлов, которые буду обрабатываться
project.addSourceFilesAtPaths([
    'src/**/*.ts',
    'src/**/*.tsx',
]);

// все файлы проекта
const files = project.getSourceFiles();

// пути до shared/ui
const uiPath = path.resolve(__dirname, '..', 'src', 'shared', 'ui');
const uiIndexPath = path.resolve(uiPath, 'index.ts');

// папки внутри shared/ui
const uiDir = project.getDirectory(uiPath);
const uiDirectories = uiDir?.getDirectories();

// index внутри shred/ui
const uiIndex = uiDir?.getSourceFile(uiIndexPath);

uiDirectories?.forEach(directory => {
    // получаем только файлы с нашими компонентами
    const file = directory.getSourceFiles().find(file => !file.getBaseNameWithoutExtension().match(/\./));

    // если файлы с компонентами есть
    if (file) {
        // получаем имя нашей компоненты
        const fileName = file.getBaseNameWithoutExtension();
        // путь до наше компоненты в файле shared/ui/index
        const modulePath =`./${fileName}/${fileName}`
        // все экспорты, которые есть в файле shared/ui/index
        const indexExportDeclarations = uiIndex?.getExportDeclarations();
        // получаем экспорты тольк из нашей компоненты (здесь типы и компоненты)
        const moduleExportDeclarations = uiIndex?.getExportDeclarations().filter(declaration => declaration.getModuleSpecifierValue() === modulePath);
        const moduleExportElementsNames = moduleExportDeclarations?.flatMap(declaration => declaration.getNamedExports());
        const indexExportsNames = moduleExportElementsNames?.map(indexExport => indexExport.getName());
        // получаем экспорты из нашей компоненты
        const fileExports = file.getExportedDeclarations();
        const fileExportsNames = Array.from(fileExports.keys());

        // проверяем все ли, что экспортируется из нашей компоненты fileName
        // экспортируется и из shred/ui/index
        fileExportsNames.forEach(exportElement => {
            const isExported = indexExportsNames?.includes(exportElement);
            const exportDeclarationType = fileExports.get(exportElement)?.[0].getType();
            const isInterface = exportDeclarationType?.isInterface();

            // если наш экспорт не экспортируется из index
            if (!isExported) {

                // если экспорт не является типом или интерфейсом
                // добавляем просто в экспорт
                if (!isInterface) {
                    // находим декларацию с экспортом компонент и добавляем в нее элемент, которые еще не экспортируется
                    const moduleDeclaration = moduleExportDeclarations?.find(declaration => {
                        return declaration.getModuleSpecifierValue() === modulePath && !declaration.isTypeOnly();
                    })

                    // если уже есть экспорт из файла, то расширяем его
                    if (moduleDeclaration) {
                        moduleDeclaration?.addNamedExport(exportElement)
                    } else {
                        // иначе создаем новый экспорт
                        uiIndex?.insertExportDeclaration(1, {
                            namedExports: [exportElement],
                            moduleSpecifier: `./${fileName}/${fileName}`,
                        })
                    }
                } else {
                    // если является типом или интерфейсом, то проверяем, экспортируются ли уже типы из нашего модуля
                    const typeModuleDeclaration = indexExportDeclarations?.find(exportDeclaration => {
                        return exportDeclaration.getModuleSpecifierValue() === modulePath && exportDeclaration.isTypeOnly();
                    })

                    // если уже есть экспорт из файла, то расширяем его
                    if (typeModuleDeclaration) {
                        typeModuleDeclaration.addNamedExport(exportElement);
                    } else {
                        // иначе создаем новый экспорт
                        uiIndex?.addExportDeclaration({
                            isTypeOnly: true,
                            namedExports: [exportElement],
                            moduleSpecifier: `./${fileName}/${fileName}`,
                        })
                    }
                    uiIndex?.save();
                }

            }
        })
    }
});


const ALLOWED_PATHS = ['app', 'shared', 'widgets', 'entities', 'pages', 'features'];


const checkAbsolutePath = (importPath: string) => {
    return ALLOWED_PATHS.some(allowedPath => importPath.startsWith(allowedPath));
};

files.forEach(sourceFile => {
    const importDeclarations = sourceFile.getImportDeclarations();

    importDeclarations.forEach(importDeclaration => {
        const importPath = importDeclaration.getModuleSpecifierValue();
        const importPathWithoutAlias = importPath.replace('@/', '');

        // нас интересует только абсолютный путь
        if (!checkAbsolutePath(importPathWithoutAlias)) {
            return;
        }

        // разделяем путь импорта на сегменты
        const segments = importPathWithoutAlias.split('/');
        const layer = segments?.[0];
        const slice = segments?.[1];

        if (layer === 'shared' && slice === 'ui') {
            importDeclaration.setModuleSpecifier('@/shared/ui');
        }
    })
})

project.save();
