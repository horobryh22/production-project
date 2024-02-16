export enum AppRoute {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    NOT_FOUND = 'not_found',
    ARTICLES = 'articles',
    ARTICLES_DETAILS = 'articles_details',
    CREATE_ARTICLE = 'article_create',
    EDIT_ARTICLE = 'article_edit',
    ADMIN = 'admin',
    FORBIDDEN = 'forbidden',
    ERROR = 'error',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => `/articles`;
export const getRouteArticleCreate = () => `/articles/create`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRoute404 = () => '/not_found';
