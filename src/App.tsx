import { PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginContext from 'features/authContext/pages/LoginContext';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {/* <LoginPage /> */}
          <LoginContext />
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
