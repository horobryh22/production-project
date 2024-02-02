import type { RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/User';

export type ExtendedRouteProps = RouteProps & { onlyAuth?: boolean; roles?: UserRole[] };
