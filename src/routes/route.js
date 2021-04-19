import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Layout from '~/pages/Layout';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isDashboard,
  ...rest
}) {
  // const signed = store.getState()?.auth?.status?.signed;

  // if (!signed && isPrivate) return <Redirect to="/" />;

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
