import { createSelector } from 'reselect';

import { selectAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { RoutePath } from '@/shared/const/router';

import { SidebarItemType } from '../../types';

export const getSidebarItems = createSelector(selectAuthData, authData => {
    const sidebarItemList: SidebarItemType[] = [
        { to: RoutePath.main, Icon: MainIcon, pageName: 'Main' },
        { to: RoutePath.about, Icon: AboutIcon, pageName: 'About' },
    ];

    if (authData) {
        sidebarItemList.push(
            {
                to: `${RoutePath.profile}${authData.id}`,
                Icon: ProfileIcon,
                pageName: 'Profile',
                authOnly: true,
            },
            {
                to: RoutePath.articles,
                Icon: ArticleIcon,
                pageName: 'Articles',
                authOnly: true,
            },
        );
    }

    return sidebarItemList;
});
