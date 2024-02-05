import type { RouteProps } from 'react-router-dom';

// eslint-disable-next-line fsd-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type ExtendedRouteProps = RouteProps & { onlyAuth?: boolean; roles?: UserRole[] };
