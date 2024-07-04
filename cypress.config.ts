import { defineConfig } from 'cypress';
// Заполняет process.env значениями из файла .env
require('dotenv').config();

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/',
        defaultCommandTimeout: 10000,
    },

    env: {
        admin_username: process.env.ADMIN_AUTH_USERNAME,
        admin_password: process.env.ADMIN_AUTH_PASSWORD,
        auth_username: process.env.AUTH_USERNAME,
        auth_password: process.env.AUTH_PASSWORD,
        host: process.env.DEVELOPMENT_HOST,
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
