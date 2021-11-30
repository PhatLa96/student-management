import { Box } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import AddPageQuery from './pages/AddPageQuery';
import EditPageQuery from './pages/EditPageQuery';
import ListPageQuery from './pages/ListPageQuery';

export default function StudentFeatureQuery() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);
  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPageQuery />
        </Route>

        <Route path={`${match.path}/add`}>
          <AddPageQuery />
        </Route>

        <Route path={`${match.path}/edit/:studentId`}>
          <EditPageQuery />
        </Route>
      </Switch>
    </Box>
  );
}
