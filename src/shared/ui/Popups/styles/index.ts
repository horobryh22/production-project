import popupCls from './popups.module.scss';

import { DropdownDirection } from '@/shared/types/ui';

export const popupDirectionClass: Record<DropdownDirection, string> = {
    'top left': popupCls.topLeft,
    'top right': popupCls.topRight,
    'bottom left': popupCls.bottomLeft,
    'bottom right': popupCls.bottomRight,
};
