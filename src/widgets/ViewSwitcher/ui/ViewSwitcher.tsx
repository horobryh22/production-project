import { memo, ReactElement, useCallback, useMemo } from 'react';

import classes from './ViewSwitcher.module.scss';

import { ArticleView } from 'entities/Article';
import ListView from 'shared/assets/icons/list.svg';
import TileView from 'shared/assets/icons/tile.svg';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme, Icon } from 'shared/ui';

interface ViewSwitcherProps {
    className?: string;
    view?: ArticleView;
    onChangeView?: (view: ArticleView) => void;
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

export const ViewSwitcher = memo((props: ViewSwitcherProps): ReactElement => {
    const { className, onChangeView, view } = props;

    const onClickViewIcon = useCallback(
        (newView: ArticleView) => () => {
            onChangeView?.(newView);
        },
        [onChangeView],
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
                    className={classNames(
                        classes.svg,
                        { [classes['active']]: view == viewItem.view },
                        [],
                    )}
                />
            </Button>
        ));
    }, [onClickViewIcon, view]);

    return (
        <div className={classNames(classes.ViewSwitcher, {}, [className])}>
            {mappedViews}
        </div>
    );
});
