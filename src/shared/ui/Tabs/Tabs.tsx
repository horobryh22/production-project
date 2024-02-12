import { memo, ReactElement, ReactNode, useCallback } from 'react';

import { CardTheme, Card } from '../Card/Card';

import classes from './Tabs.module.scss';

// TODO
// eslint-disable-next-line
import type { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib';

export interface TabItem {
    value: ArticleType;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: ArticleType;
    onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps): ReactElement => {
    const { className, tabs, onTabClick, value } = props;

    const handleTabClick = useCallback(
        (tab: TabItem) => {
            return () => onTabClick(tab);
        },
        [onTabClick],
    );

    const mappedTabs = tabs?.map((tab, index) => {
        const theme = tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED;

        return (
            <Card
                key={index}
                onClick={handleTabClick(tab)}
                className={classes.card}
                theme={theme}
            >
                {tab.content}
            </Card>
        );
    });

    return <div className={classNames(classes.Tabs, {}, [className])}>{mappedTabs}</div>;
});
