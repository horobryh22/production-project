import { ReactElement, ReactNode, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { UserRole, selectUserRoles } from '@/entities/User';
import { getRouteForbidden } from '@/shared/const/router';

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
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children as ReactElement;
};
