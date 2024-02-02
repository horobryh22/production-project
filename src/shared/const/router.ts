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

export const RoutePath: Record<AppRoute, string> = {
    [AppRoute.MAIN]: '/',
    [AppRoute.ABOUT]: '/about',
    [AppRoute.PROFILE]: '/profile/',
    [AppRoute.ARTICLES]: '/articles',
    [AppRoute.CREATE_ARTICLE]: '/articles/create',
    [AppRoute.EDIT_ARTICLE]: '/articles/:id/edit',
    [AppRoute.ARTICLES_DETAILS]: '/articles/',
    [AppRoute.ARTICLES_DETAILS]: '/articles/',
    [AppRoute.ADMIN]: '/admin',
    [AppRoute.FORBIDDEN]: '/forbidden',
    [AppRoute.NOT_FOUND]: '/not_found',
    [AppRoute.ERROR]: '*',
};
