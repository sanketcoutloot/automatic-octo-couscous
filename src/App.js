import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AddUser, AddUserToDashboard, UsersList, DeletedUsers } from './pages';

import { Layout } from './component/Layout.js';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path="/addUser">
                            <Layout children={<AddUser />} />
                        </Route>

                        <Route path="/addUserToDashboard">
                            <Layout children={<AddUserToDashboard />} />
                        </Route>

                        <Route path="/users">
                            <Layout children={<UsersList />} />
                        </Route>

                        <Route path="/deletedUsers">
                            <Layout children={<DeletedUsers />} />
                        </Route>

                        <Route render={() => <h1>PAge not found</h1>} />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
