const path = require('path');

// в этой функции мы выходим на верхний уровень нашего проекта, чтобы было
// удобно обращаться к папке src и всему, что в нее вложено.

module.exports = (...segments) => path.resolve(__dirname, '..', '..', '..', ...segments);