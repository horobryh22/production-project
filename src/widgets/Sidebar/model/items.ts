import { SVGProps, VFC } from 'react';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
    to: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    pageName: string;
}

export const SidebarItemList: SidebarItemType[] = [
    { to: RoutePath.main, Icon: MainIcon, pageName: 'Main' },
    { to: RoutePath.about, Icon: AboutIcon, pageName: 'About' },
    { to: RoutePath.profile, Icon: ProfileIcon, pageName: 'Profile' },
];
