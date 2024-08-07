## Запуск проекта


- `npm install` - устанавливаем зависимости
- `npm run start:dev` или `npm run start:dev:vite` - запуск сервера + frontend проекта в dev режиме

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run prettier` - Проверка файлов prettier'ом
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:rules` - Запуск тестирования собственных правил для ESLint
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:e2e` - Запуск e2e тестов с cypress
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run analyze:prod` - Скрипт запускает анализ бандла для продакшн сборки (в отдельной вкладке в браузере)
- `npm run analyze:dev` - Скрипт запускает анализ бандла для дев сборки (в отдельной вкладке в браузере)
- `npm run storybook` - Запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run prepare` - Запуск прекоммит хуков
- `npm run generate:slice` - Скрипт для генерации FSD слайсов
- `npm run postinstall` - Скрипт выполняется после установки зависимостей, командой `npm i`
- `npm run feature:remove` - Скрипт для того, чтобы раскатать или удалить фичу
----

## Архитектура проекта

Проект написан в соответствии с методологией `Feature sliced design`

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека `i18next` для работы с переводами.
Файлы с переводами хранятся в `public/locales`.

Для комфортной работы рекомендуем установить плагин для `webstorm/vscode`

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тесты

В проекте используются 4 вида тестов:

1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library -`npm run test:unit`
3) Скриншотное тестирование с loki `npm run test:ui`
4) e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

----

## Линтинг

В проекте используется `eslint` для проверки typescript кода и `stylelint` для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin: `eslint-plugin-fsd-plugin`,
который содержит 3 правила:

1) `path-checker` - запрещает использовать абсолютные импорты в рамках одного модуля
2) `layer-imports` - проверяет корректность использования слоев с точки зрения FSD
   (например, widgets нельзя использовать в features и entities)
3) `public-api-imports` - разрешает импорт из других модулей только из public api. Имеет auto fix.

##### Запуск линтеров
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

----

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со стори-кейсами лежит рядом с компонентом, имеет расширение .stories.tsx

Запустить storybook можно командой:
- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```

----

## Конфигурация проекта

Для разработки проект содержит 2 конфига:
1. `webpack - ./config/build`
2. `vite - ./vite.config.ts`

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в ./config
- `./config/babel` - babel
- `./config/build` - конфигурация webpack
- `./config/jest` - конфигурация тестовой среды
- `./config/storybook` - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга, написания кода, генерации отчетов и тд.

----

## CI pipeline и pre commit хуки

Конфигурация `github actions` находится в `/.github/workflows`.
В CI прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в `/.husky`.

----

### Работа с данными

Взаимодействие с данными осуществляется с помощью RTK.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter.

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется хук
[useDynamicModuleLoader](/src/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader.ts)

----

### Работа с feature-flags

Разрешено использование feature-flags только с помощью метода класса Features -> toggleFeatures

он принимает объект с опциями

````
{
   name: название фича-флага,
   on: функция, которая отработает после Включения фичи
   of: функция, которая отработает после ВЫключения фичи
}
````

Этот метод необходимо вызывать только в JSX разметке, в текущей реализации скрипт обрабатывает только фичи, определенные внутри JSX разметки.

Для автоматического удаления фичи использовать скрипт `npm run feature:remove`,
который принимает 2 аргумента:
1. Название удаляемого фича-флага
2. Состояние (on\off)

````
npm run feature:remove -- isArticleRatingEnabled off
````
----

## Сущности (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)
  
## Фичи (features)

- [ArticleComments](/src/features/ArticleComments)
- [ArticleInfiniteList](/src/features/ArticleInfiniteList)
- [ArticleRating](/src/features/ArticleRating)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
- [ArticlesPageFilter](/src/features/ArticlesPageFilter)
- [AuthByUserName](/src/features/AuthByUserName)
- [AvatarDropdown](/src/features/AvatarDropdown)
- [EditableProfileCard](/src/features/EditableProfileCard)
- [NotificationButton](/src/features/NotificationButton)
- [ProfileRating](/src/features/ProfileRating)
  
