import { memo, ReactElement, useCallback, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectViewSwitcherView } from '../model/selectors/viewSwitcherSelectors';
import { initView } from '../model/services/initView/initView';
import {
    viewSwitcherActions,
    viewSwitcherReducer,
} from '../model/slice/viewSwitcherSlice';

import classes from './ViewSwitcher.module.scss';

import { ArticleView } from 'entities/Article';
import ListView from 'shared/assets/icons/list.svg';
import TileView from 'shared/assets/icons/tile.svg';
import {
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
    useInitialEffect,
} from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Button, ButtonTheme, HStack, Icon } from 'shared/ui';

interface ViewSwitcherProps {
    className?: string;
}

const viewTypes = [
    {
        id: 1,
        Svg: TileView,
        view: ArticleView.TILE,
    },
    {
        id: 2,
        Svg: ListView,
        view: ArticleView.LIST,
    },
];

const reducers: ReducersList = {
    viewSwitcher: viewSwitcherReducer,
};

export const ViewSwitcher = memo((props: ViewSwitcherProps): ReactElement => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const view = useSelector(selectViewSwitcherView);

    const onClickViewIcon = useCallback(
        (newView: ArticleView) => () => {
            dispatch(viewSwitcherActions.setView(newView));
        },
        [dispatch],
    );

    const mappedViews = useMemo(() => {
        return viewTypes.map(viewItem => (
            <Button
                key={viewItem.id}
                theme={ButtonTheme.CLEAR}
                onClick={onClickViewIcon(viewItem.view)}
            >
                <Icon
                    Svg={viewItem.Svg}
                    className={classNames('', {
                        [classes['no-active']]: view !== viewItem.view,
                    })}
                />
            </Button>
        ));
    }, [onClickViewIcon, view]);

    useDynamicModuleLoader(reducers);

    useInitialEffect(() => {
        dispatch(initView());
    }, []);

    return (
        <HStack
            justify={'between'}
            className={classNames(classes.ViewSwitcher, {}, [className])}
        >
            {mappedViews}
        </HStack>
    );
});
