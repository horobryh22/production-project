import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const selectViewSwitcherView = (state: StateSchema): ArticleView =>
    state.viewSwitcher?.view || ArticleView.TILE;
export const selectViewSwitcherInited = (state: StateSchema): boolean =>
    state.viewSwitcher?._inited || false;
