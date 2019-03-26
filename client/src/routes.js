import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Layout from './hoc/Layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books/:id" component={Books} />
      </Switch>
    </Layout>
  );
};

export default Routes;
