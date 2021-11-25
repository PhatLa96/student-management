// import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
// import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from 'react';
// import { AuthContext } from '../AuthContext';

// interface LoginProps {
//   open: boolean;
//   handleClose: Dispatch<SetStateAction<boolean>>;
// }

// const Login = ({ open, handleClose }: LoginProps) => {
//   //context
//   const { toggleAuth } = useContext(AuthContext);

//   //state
//   const [userName, setUserName] = useState({ userName: '', password: '' });

//   const handleSubmit = () => {
//     toggleAuth(userName);
//     setUserName('');
//     handleClose(false);
//   };
//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogContent>
//         <TextField label="Username" onChange={handleChange} value={userName} required />
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           disabled={userName === ''}
//         >
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default Login;
import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { AuthContext } from '../AuthContext';
import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
}));

export default function LoginContext() {
  const { toggleAuth } = useContext(AuthContext);
  const classes = useStyles();

  const history = useHistory();

  const handleLoginClick = () => {
    toggleAuth({ id: '12', name: 'phat' });

    history.push('/admin/dashboard');
  };
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
