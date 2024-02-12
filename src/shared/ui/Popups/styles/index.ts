import { DropdownDirection } from '@/shared/types/ui';

import popupCls from './popups.module.scss';

export const popupDirectionClass: Record<DropdownDirection, string> = {
    'top left': popupCls.topLeft,
    'top right': popupCls.topRight,
    'bottom left': popupCls.bottomLeft,
    'bottom right': popupCls.bottomRight,
};
