import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Layout from './hoc/Layout';
import Login from './containers/Admin/Login';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/books/:id" component={Books} />
      </Switch>
    </Layout>
  );
};

export default Routes;
