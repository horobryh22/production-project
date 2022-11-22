import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticlesPage from './ArticlesPage';

import { Article, ArticleView } from 'entities/Article';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = args => <ArticlesPage {...args} />;

const article: Article = {
    id: '25',
    user: {
        id: '1',
        username: 'Ilya',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
    },
    title: 'Python news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [ArticleType.IT],
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
    ],
};

export const TileView = Template.bind({});
TileView.args = {};
TileView.decorators = [
    StoreDecorator({
        articlePage: {
            page: 1,
            view: ArticleView.TILE,
            ids: ['1', '2', '3', '4'],
            entities: {
                '1': article,
                '2': article,
                '3': article,
                '4': article,
            },
        },
    }),
];

export const TileViewLoading = Template.bind({});
TileViewLoading.args = {};
TileViewLoading.decorators = [
    StoreDecorator({
        articlePage: {
            page: 1,
            view: ArticleView.TILE,
            ids: [],
            entities: {},
            isLoading: true,
        },
    }),
];

export const ListView = Template.bind({});
ListView.args = {};
ListView.decorators = [
    StoreDecorator({
        articlePage: {
            page: 1,
            view: ArticleView.LIST,
            ids: ['1', '2', '3', '4'],
            entities: {
                '1': article,
                '2': article,
                '3': article,
                '4': article,
            },
        },
    }),
];

export const ListViewLoading = Template.bind({});
ListViewLoading.args = {};
ListViewLoading.decorators = [
    StoreDecorator({
        articlePage: {
            page: 1,
            view: ArticleView.LIST,
            ids: [],
            entities: {},
            isLoading: true,
        },
    }),
];
