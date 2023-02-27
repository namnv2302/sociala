import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import ROUTE_PATH from './routes';

// pages
import HomePage from '@pages/Home';
import ProfilePage from '@pages/Profile';
import SignInPage from '@pages/SignIn';
import RegisterPage from '@pages/Register';
import NotFoundPage from '@pages/NotFound';

type publicRoutesType = {
    path: string;
    component: FC;
    layout?: null | FC;
};

export const NavigateToNotFound = () => {
    return <Navigate to={ROUTE_PATH.NOT_FOUND} />;
};

export const NavigateToSignIn = () => {
    return <Navigate to={ROUTE_PATH.SIGN_IN} />;
};

export const publicRoutes: publicRoutesType[] = [
    {
        path: ROUTE_PATH.HOME,
        component: HomePage,
    },
    {
        path: ROUTE_PATH.PROFILE,
        component: ProfilePage,
    },
    {
        path: ROUTE_PATH.SIGN_IN,
        component: SignInPage,
        layout: null,
    },
    {
        path: ROUTE_PATH.REGISTER,
        component: RegisterPage,
        layout: null,
    },
    {
        path: ROUTE_PATH.NOT_FOUND,
        component: NotFoundPage,
        layout: null,
    },
    {
        path: ROUTE_PATH.OTHER,
        component: NavigateToNotFound,
        layout: null,
    },
];
