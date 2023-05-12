import { ReactElement, ReactNode, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from '../../config/routeConfig';

import { UserRole, selectUserRoles } from 'entities/User';

interface RequireRoleProps {
    roles: UserRole[];
    children: ReactNode | null;
}

export const RequireRole = ({
    children,
    roles,
}: RequireRoleProps): ReactElement | null => {
    let location = useLocation();
    const userRoles = useSelector(selectUserRoles);

    const hasRequiredRoles = useMemo(
        () => userRoles?.some(userRole => roles?.includes(userRole)),
        [roles, userRoles],
    );

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children as ReactElement;
};
