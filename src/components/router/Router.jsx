import * as React from 'react';
import { Switch, Route } from 'react-router';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';

const Router = () => {
  return (
    <Switch>
      <Route path="/user/:id" component={User} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
}

export default Router;