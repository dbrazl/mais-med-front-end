import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './route';

import SignIn from '../pages/SignIn';
import SignUp from '~/pages/SignUp';
import Location from '~/pages/Location';
import RankName from '~/pages/RankName';
import Statistics from '~/pages/Statistics';
import Meds from '~/pages/Meds';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/location" exact isPrivate component={Location} />
      <Route path="/name" exact isPrivate component={RankName} />
      <Route
        path="/statistics"
        exact
        isPrivate
        isDashboard
        component={Statistics}
      />
      <Route path="/meds" exact isPrivate isDashboard component={Meds} />
    </Switch>
  );
}

export default Routes;
