import React from 'react';
import { Route, Switch } from 'react-router';
const Dashboard = React.lazy(
  () =>
    import(
      /* webpackChunkName: "dashboard" */
      /* webpackPrefetch: true */
      '../pages/Dashboard'
    ),
);
const Repo = React.lazy(
  () =>
    import(
      /* webpackChunkName: "repo" */
      /* webpackPrefetch: true */
      '../pages/Repo'
    ),
);

export const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={'loading..'}>
      <Switch>
        <Route component={Dashboard} path="/" exact />
        <Route component={Repo} path="/repositories/:repository+" />
      </Switch>
    </React.Suspense>
  );
};
