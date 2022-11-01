import { SVGProps, VFC } from 'react';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
    to: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    pageName: string;
    authOnly?: boolean;
}

export const SidebarItemList: SidebarItemType[] = [
    { to: RoutePath.main, Icon: MainIcon, pageName: 'Main' },
    { to: RoutePath.about, Icon: AboutIcon, pageName: 'About' },
    { to: RoutePath.profile, Icon: ProfileIcon, pageName: 'Profile', authOnly: true },
    { to: RoutePath.articles, Icon: ArticleIcon, pageName: 'Articles', authOnly: true },
];
