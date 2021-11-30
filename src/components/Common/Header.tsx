import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from 'features/authContext/AuthContext';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  langBtn: {
    color: 'white',
    width: '16px',
  },
}));

export function Header() {
  const history = useHistory();
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const { toggleLogout } = useContext(AuthContext);
  const handleLogout = () => {
    toggleLogout({ id: '', name: '' });
    history.push('/');
  };
  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {t('Student Management')}
          </Typography>
          <Button className={classes.langBtn} onClick={() => handleChangeLang('en')}>
            en
          </Button>
          <Button className={classes.langBtn} onClick={() => handleChangeLang('vi')}>
            vi
          </Button>
          &nbsp;
          <Button
            // onClick={() => dispatch(authActions.logout())}
            onClick={handleLogout}
            variant="contained"
            color="secondary"
          >
            {t('Logout')}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
