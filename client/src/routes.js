import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import User from './components/Admin';
import Login from './containers/Admin/Login';
import AddBook from './containers/Admin/AddBook';
import UserPosts from './components/Admin/UserPosts';
import EditBook from './containers/Admin/EditBook';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user" exact component={Auth(User, true)} />
        <Route path="/user/add" exact component={Auth(AddBook, true)} />
        <Route
          path="/user/user-reviews"
          exact
          component={Auth(UserPosts, true)}
        />
        <Route
          path="/user/edit-post/:id"
          exact
          component={Auth(EditBook, true)}
        />
        <Route path="/books/:id" component={Auth(Books)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
