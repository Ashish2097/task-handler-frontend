import * as React from 'react';
import { Switch, Route } from 'react-router';
import Dashboard from '../pages/Dashboard';

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  );
}

export default Router;