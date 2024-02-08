import { ReactNode } from 'react';

export type DropdownDirection = 'top right' | 'top left' | 'bottom right' | 'bottom left';

export interface DropdownItems {
    href?: string;
    content?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}
