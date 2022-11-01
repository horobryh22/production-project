import { ReactElement, ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from '../../config/routeConfig';

import { selectIsUserAuth } from 'entities/User';

interface RequireAuthProps {
    children: ReactNode | null;
}

export const RequireAuth = ({ children }: RequireAuthProps): ReactElement | null => {
    let auth = useSelector(selectIsUserAuth);
    let location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children as ReactElement;
};
