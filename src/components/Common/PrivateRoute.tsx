import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {}
// * lưu ý: khai báo biên props : RouteProps để PrivateRoute như là 1 Route không khai báo thì lỗi
export const PrivateRoute = (props: RouteProps) => {
  // Check if user is logged in
  // if yes show route
  // otherwise , redirect to login pages

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
};
