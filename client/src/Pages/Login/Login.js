import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Hidden } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { AuthActions, AuthSelectors } from '../../Reducers/AuthReducers';
import { CommonSelectors } from '../../Reducers/CommonReducers';

import InputTextField from '../../Components/Input/Input';

import Images from '../../Resources/Images';
import SnackBar from '../../Components/SnackBar';
import Loader from '../../Components/Loader';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    width: '100vw',
    height: '101vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(8, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'developed by '}
      <Link color="inherit" target="_blank" href="https://github.com/genyaonipko">
        Yevheii Onipko
      </Link>
    </Typography>
  );
}

const bgImage = Images.getRandomImage();

const Login = props => {
  const submit = values => {
    if (props.fetching) return null;
    return props.loginUser(values, props.history);
  };

  const classes = useStyles();

  const { handleSubmit } = props;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Hidden only="xs">
        <Grid item xs={false} sm={4} md={8}>
          <img className={classes.image} src={bgImage} alt="random_image" />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войдите в приложение
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(submit)}>
            <Field
              label="Электронная почта"
              name="email"
              required
              autoComplete="email"
              component={InputTextField}
              type="text"
              fullWidth
            />
            <Field
              label="Пароль"
              name="password"
              required
              autoComplete="current-password"
              component={InputTextField}
              type="password"
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!!props.error}
            >
              {props.fetching ? <Loader /> : 'Далее'}
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <SnackBar
        visible={props.error}
        type="error"
        message={props.error}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      />
    </Grid>
  );
};

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

const mSTP = createStructuredSelector({
  errors: CommonSelectors.selectErrors,
  fetching: AuthSelectors.selectFetching,
  error: AuthSelectors.selectError,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      loginUser: AuthActions.loginUser,
    },
    dispatch,
  );

export default compose(
  reduxForm({ form: 'login' }),
  connect(
    mSTP,
    mDTP,
  ),
)(Login);
