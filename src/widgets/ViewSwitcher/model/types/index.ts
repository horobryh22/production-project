import { ArticleView } from 'entities/Article';

export interface ViewSwitcherSchema {
    view: ArticleView;
    _inited: boolean;
}
