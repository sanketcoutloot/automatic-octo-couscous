import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { AddUser, AddUserToDashboard, UsersList, DeletedUsers } from './pages';

const routes = [
    {
        path: '/',
        exact: true,
        page: () => <h2>Home</h2>,
    },
    {
        path: '/addUser',
        page: <AddUser />,
    },
    {
        path: '/addUserToDashboard',
        page: <AddUserToDashboard />,
    },
    {
        path: '/userList',
        page: <UsersList />,
    },
    {
        path: '/users',
        page: <DeletedUsers />,
    },
];

const Routes = () => (
    <Switch>
        {routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={route.page}
            />
        ))}
    </Switch>
);

export default Routes;
