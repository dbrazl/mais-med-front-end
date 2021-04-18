import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './route';

import SignIn from '../pages/SignIn';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
    </Switch>
  );
}

export default Routes;
