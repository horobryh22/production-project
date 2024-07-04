#!/bin/bash

# Переходим в директорию проекта
cd ~/production-project

# Обновляем код из репозитория
git pull origin main

# Собираем проект
npm run build:prod

# Удаляем старую версию из директории назначения
rm -rf /var/www/production-project/html

# Перемещаем новую сборку в директорию назначения
mv ~/production-project/build /var/www/production-project/html

# Выводим сообщение об успешном завершении
echo "Deployment completed successfully!"
