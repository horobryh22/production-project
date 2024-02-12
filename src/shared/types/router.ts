import type { RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/User'; // eslint-disable-line fsd-plugin/layer-imports

export type ExtendedRouteProps = RouteProps & { onlyAuth?: boolean; roles?: UserRole[] };
