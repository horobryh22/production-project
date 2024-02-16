import { createSelector } from 'reselect';

import { selectAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';

import { SidebarItemType } from '../../types';

export const getSidebarItems = createSelector(selectAuthData, authData => {
    const sidebarItemList: SidebarItemType[] = [
        { to: getRouteMain(), Icon: MainIcon, pageName: 'Main' },
        { to: getRouteAbout(), Icon: AboutIcon, pageName: 'About' },
    ];

    if (authData) {
        sidebarItemList.push(
            {
                to: getRouteProfile(authData.id),
                Icon: ProfileIcon,
                pageName: 'Profile',
                authOnly: true,
            },
            {
                to: getRouteArticles(),
                Icon: ArticleIcon,
                pageName: 'Articles',
                authOnly: true,
            },
        );
    }

    return sidebarItemList;
});
