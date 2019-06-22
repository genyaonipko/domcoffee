import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Loader from '../../Components/Loader';

import { loginUser } from '../../Redux/actions/authentication';
import { additionalSelectors } from '../../Redux/reducers/additionalReducer';

import InputTextField from '../../Components/Input/Input';

import Images from '../../Resources/Images';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  invalid: {
    color: 'red',
    fontSize: 10,
    marginTop: 4,
  },
});

class Login extends Component {
  state = {
    errors: {},
  };

  static getDerivedStateFromProps(props) {
    return {
      errors: props.errors,
    };
  }

  submit = values => {
    this.props.loginUser(values, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { classes, handleSubmit, isLoading } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <img style={{ width: 200 }} src={Images.Logo} alt="dom-coffee" />
            <Typography variant="h5">Вход в приложение</Typography>
            <form className={classes.form} onSubmit={handleSubmit(this.submit)}>
              <FormControl margin="normal" required fullWidth>
                <Field
                  label="Электронная почта"
                  name="email"
                  autoComplete="email"
                  component={InputTextField}
                  type="text"
                />
                {errors.email && (
                  <div className={classes.invalid}>{errors.email}</div>
                )}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <Field
                  label="Пароль"
                  name="password"
                  autoComplete="current-password"
                  component={InputTextField}
                  type="password"
                />
                {errors.password && (
                  <div className={classes.invalid}>{errors.password}</div>
                )}
              </FormControl>
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Вход
                </Button>
              )}
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mSTP = createStructuredSelector({
  errors: additionalSelectors.selectErrors,
  isLoading: additionalSelectors.selectLoader,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      loginUser,
    },
    dispatch,
  );

export default compose(
  withStyles(styles),
  reduxForm({ form: 'login' }),
  connect(
    mSTP,
    mDTP,
  ),
)(Login);
