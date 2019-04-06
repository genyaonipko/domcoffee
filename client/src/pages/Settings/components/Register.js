import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { createStructuredSelector } from 'reselect';

import { registerUser } from '../../../redux/actions/authentication';
import { additionalSelectors } from '../../../redux/reducers/additionalReducer';

const styles = () => ({
  mainArea: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  invalid: {
    color: 'red',
    fontSize: 10,
    marginTop: 4,
  },
  wrapper: {
    width: 500,
    marginLeft: 32,
  },
});

const InputTextField = ({ input, label, autoFocus, type, ...rest }) => (
  <TextField
    autoFocus={autoFocus}
    margin="dense"
    id={name}
    label={label}
    type={type}
    {...input}
    {...rest}
  />
);

InputTextField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

class Register extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({}).isRequired,
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
        <Typography variant="h4" gutterBottom>
          Добавьте пользователя
        </Typography>
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

          <Button
            onClick={() => history.push('/settings/users')}
            color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Добавить
          </Button>
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
