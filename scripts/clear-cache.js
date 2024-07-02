const path = require('path');
const fs = require('fs');

const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');

if (fs.existsSync(cacheDir)) {
    fs.rmdirSync(cacheDir, { recursive: true });
    console.log(`Cache directory ${cacheDir} has been removed.`);
} else {
    console.log(`Cache directory ${cacheDir} does not exist.`);
}

/* скрипт удаляет папку .cache после установки зависимостей с помощью npm i */
