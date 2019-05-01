import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Loader from '../../components/Loader';

import { loginUser } from '../../redux/actions/authentication';
import { additionalSelectors } from '../../redux/reducers/additionalReducer';

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

const InputTextField = ({
  input,
  type,
  name,
  autoFocus,
  autoComplete,
  ...rest
}) => (
  <Input
    autoFocus={autoFocus}
    autoComplete={autoComplete}
    id={name}
    type={type}
    name={name}
    {...input}
    {...rest}
  />
);

InputTextField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string.isRequired,
};

InputTextField.defaultProps = {
  name: null,
  autoFocus: null,
};

class Login extends Component {
  state = {
    errors: {},
  };

  static getDerivedStateFromProps(props) {
    return {
      errors: props.errors
    }
  }

  submit = values => {
    this.props.loginUser(values, this.props.history)
  };

  render() {
    const { errors } = this.state;
    const { classes, handleSubmit, isLoading } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>
            <form className={classes.form} onSubmit={handleSubmit(this.submit)}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Field
                  name="email"
                  autoComplete="email"
                  autoFocus
                  component={InputTextField}
                  type="text"
                />
                {errors.email && (
                  <div className={classes.invalid}>{errors.email}</div>
                )}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Field
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
                  Sign in
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

const mDTP = dispatch => bindActionCreators({
  loginUser,
}, dispatch);

export default compose(
  withStyles(styles),
  reduxForm({ form: 'login' }),
  connect(
    mSTP,
    mDTP,
  ),
)(Login);
