const path = require('path');
const fs = require('fs');

const cacheDir =  path.resolve(__dirname, '..', 'node_modules', '.cache');

fs.rmdirSync(cacheDir, {recursive: true});

/* скрипт удаляет папку .cache после установки зависимостей с помощью npm i */
