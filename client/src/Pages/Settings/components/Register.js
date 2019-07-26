import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import DialogActions from '@material-ui/core/DialogActions';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import { createStructuredSelector } from 'reselect';

import InputTextField from '../../../Components/Input/Input';
import { registerUser } from '../../../Redux/actions/authentication';
import { additionalSelectors } from '../../../Redux/reducers/additionalReducer';

const styles = () => ({
  mainArea: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
    marginLeft: 32,
    marginTop: 20
  },
  invalid: {
    color: 'red',
    fontSize: 10,
    marginTop: 4,
  },
  wrapper: {
    width: 500,
    marginLeft: 0,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    marginLeft: 32,
  }
});

class Register extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    classes: PropTypes.shape().isRequired,
    errors: PropTypes.shape({}).isRequired,
  };

  state = {
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  submit = values => {
    this.props.onSubmit({ ...values, role: 'user' });
  };

  render() {
    const { errors } = this.state;
    const { classes, handleSubmit, history } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <Fab
            color="secondary"
            aria-label="Back"
            onClick={() => history.push('/settings')}>
            <ArrowBack />
          </Fab>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Добавьте пользователя
          </Typography>
        </div>
        <form onSubmit={handleSubmit(this.submit)}>
          <div className={classes.mainArea}>
            <FormControl margin="normal" required fullWidth>
              <Field
                autoFocus
                component={InputTextField}
                name="name"
                label="Имя пользователя*"
                type="text"
                id="name"
              />
              {errors.name && (
                <div className={classes.invalid}>{errors.name}</div>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                autoFocus={false}
                component={InputTextField}
                name="email"
                label="Адрес электронной почты*"
                type="email"
                id="email"
              />
              {errors.email && (
                <div className={classes.invalid}>{errors.email}</div>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                autoFocus={false}
                component={InputTextField}
                name="password"
                label="Пароль*"
                type="password"
                id="password"
              />
              {errors.password && (
                <div className={classes.invalid}>{errors.password}</div>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                autoFocus={false}
                component={InputTextField}
                name="password_confirm"
                label="Подтвердите пароль*"
                type="password"
                id="password_confirm"
              />
              {errors.password_confirm && (
                <div className={classes.invalid}>{errors.password_confirm}</div>
              )}
            </FormControl>
          </div>
          <DialogActions>
            <Button
              onClick={() => history.push('/settings/users')}
              color="secondary"
              variant="contained">
              Отменить
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained">
              Добавить
            </Button>
          </DialogActions>
        </form>
      </div>
    );
  }
}

const mSTP = createStructuredSelector({
  errors: additionalSelectors.selectErrors,
});

const mDTP = dispatch => bindActionCreators({
  onSubmit: registerUser,
}, dispatch);

export default compose(
  withStyles(styles),
  reduxForm({ form: 'register' }),
  connect(
    mSTP,
    mDTP,
  ),
)(Register);
