import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import history from '~/services/history';

import Layout from '~/pages/Layout';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isDashboard,
  ...rest
}) {
  const authentificated = store.getState()?.auth?.status?.authentificated;

  if (!authentificated && isPrivate) history.push('/');
  if (authentificated && !isPrivate) history.push('/statistics');

  if (isDashboard)
    return (
      <Route
        {...rest}
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    );

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  isDashboard: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isDashboard: false,
  component: <></>,
};
