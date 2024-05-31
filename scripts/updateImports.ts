import { Project } from 'ts-morph';

const project = new Project();

// сначала добавляем все файлы
project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);

// затем получаем эти файлы
const files = project.getSourceFiles();

const ALLOWED_PATHS = ['app', 'shared', 'widgets', 'entities', 'pages', 'features'];
const checkAbsolutePath = (importPath: string) => {
    return ALLOWED_PATHS.some(allowedPath => importPath.startsWith(allowedPath));
};

files.forEach(sourceFile => {
    const importDeclarations = sourceFile.getImportDeclarations();

    importDeclarations.forEach(importDeclaration => {
        const importPath = importDeclaration.getModuleSpecifierValue();

        if (checkAbsolutePath(importPath)) {
            importDeclaration.setModuleSpecifier('@/' + importPath);
        }
    });
});

project.save();
