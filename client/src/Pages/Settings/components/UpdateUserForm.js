import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { UserActions } from '../../../Reducers/UserReducers';
import InputTextField from '../../../Components/Input/Input';

const styles = () => ({
  mainArea: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
  },
});

class UpdateUserForm extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
    classes: PropTypes.shape({
      mainArea: PropTypes.shape({}).isRequired,
    }).isRequired,
    keyItem: PropTypes.string.isRequired,
  };

  static defaultProps = {
    handleSubmit: () => {},
  };

  submit = values => {
    // console.log(values);
    this.props.onSubmit(this.props.keyItem, values);
    this.props.handleClose();
  };

  render() {
    const { open, handleClose, classes, handleSubmit } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить пользователя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Внесите пожалуйста изменения в пользователя
          </DialogContentText>
          <form onSubmit={handleSubmit(this.submit)}>
            <div className={classes.mainArea}>
              <Field
                autoFocus
                component={InputTextField}
                type="text"
                name="name"
                label="Имя"
              />
              <Field
                autoFocus={false}
                component={InputTextField}
                type="email"
                name="email"
                label="Электронная почта"
              />
              <Field
                autoFocus={false}
                component={InputTextField}
                type="text"
                name="date"
                label="Дата приема на работу"
              />
            </div>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="secondary">
                Отменить
              </Button>
              <Button variant="contained" type="submit" color="secondary">
                Изменить
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mDTP = dispatch => ({
  onSubmit: (key, obj) => dispatch(UserActions.updateUser(key, obj)),
});

export default compose(
  withStyles(styles),
  reduxForm({ form: 'updateUser' }),
  connect(
    null,
    mDTP,
  ),
)(UpdateUserForm);
