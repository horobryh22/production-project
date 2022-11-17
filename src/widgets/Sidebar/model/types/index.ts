import { SVGProps, VFC } from 'react';

export interface SidebarItemType {
    to: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    pageName: string;
    authOnly?: boolean;
}
