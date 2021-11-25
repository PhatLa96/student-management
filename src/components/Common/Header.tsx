import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import { AuthContext } from 'features/authContext/AuthContext';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));

export function Header() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { toggleLogout } = useContext(AuthContext);
  const handleLogout = () => {
    toggleLogout({ id: '', name: '' });
    history.push('/login');
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Management
          </Typography>
          <Button
            // onClick={() => dispatch(authActions.logout())}
            onClick={handleLogout}
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
