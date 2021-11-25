import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import LoginContext from 'features/authContext/pages/LoginContext';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path="/login">
          {/* <LoginPage /> */}
          <LoginContext />
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
