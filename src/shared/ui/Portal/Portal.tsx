import { ReactNode } from 'react';

import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    container?: HTMLElement;
}

export const Portal = (props: PortalProps): any => {
    const { children, container = document.body } = props;

    return createPortal(children, container);
};
