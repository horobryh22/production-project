import { memo, ReactElement, useCallback, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { ArticleView } from '@/entities/Article';
import ListView from '@/shared/assets/icons/list.svg';
import TileView from '@/shared/assets/icons/tile.svg';
import {
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
    useInitialEffect,
} from '@/shared/lib';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Button, ButtonTheme, HStack, Icon } from '@/shared/ui';

import { selectViewSwitcherView } from '../model/selectors/viewSwitcherSelectors';
import { initView } from '../model/services/initView/initView';
import {
    useViewSwitcherActions,
    viewSwitcherReducer,
} from '../model/slice/viewSwitcherSlice';

import classes from './ViewSwitcher.module.scss';

interface ViewSwitcherProps {
    className?: string;
}

const viewTypes = [
    {
        id: 1,
        Svg: TileView,
        view: ArticleView.TILE,
        'data-testid': 'ViewSwitcher.Tile',
    },
    {
        id: 2,
        Svg: ListView,
        view: ArticleView.LIST,
        'data-testid': 'ViewSwitcher.List',
    },
];

const reducers: ReducersList = {
    viewSwitcher: viewSwitcherReducer,
};

export const ViewSwitcher = memo((props: ViewSwitcherProps): ReactElement => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { setView } = useViewSwitcherActions();

    const view = useSelector(selectViewSwitcherView);

    const onClickViewIcon = useCallback(
        (newView: ArticleView) => () => {
            setView(newView);
        },
        [setView],
    );

    const mappedViews = useMemo(() => {
        return viewTypes.map(viewItem => (
            <Button
                key={viewItem.id}
                theme={ButtonTheme.CLEAR}
                onClick={onClickViewIcon(viewItem.view)}
                data-testid={viewItem['data-testid']}
            >
                <Icon
                    data-testid={viewItem['data-testid'] + '.Icon'}
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
