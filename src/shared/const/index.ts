import { memo } from 'react';

// типизированный React.memo (для компонент с дженериками)
export const typedMemo: <T>(component: T) => T = memo;
