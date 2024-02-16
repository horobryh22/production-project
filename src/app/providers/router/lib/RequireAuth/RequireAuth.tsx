import { ReactElement, ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsUserAuth } from '@/entities/User';
import { getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
    children: ReactNode | null;
}

export const RequireAuth = ({ children }: RequireAuthProps): ReactElement | null => {
    let auth = useSelector(selectIsUserAuth);
    let location = useLocation();

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    return children as ReactElement;
};
