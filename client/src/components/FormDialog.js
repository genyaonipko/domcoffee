import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import 'moment/locale/ru';
import InputTextField from './Input/Input';

import { Creators } from '../Redux/actions/additional/additional';

const styles = () => ({
  mainArea: {
    display: 'flex',
  },
  inputArea: {
    marginLeft: 16,
  },
  dateArea: {
    padding: 16,
  },
});

InputTextField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
};

InputTextField.defaultProps = {
  autoFocus: false,
};

class FormDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    changeDate: PropTypes.func.isRequired,
  };

  state = {
    date: moment(),
  };

  componentDidUpdate = prevProps => {
    if (this.props.open !== prevProps.open) {
      this.props.reset();
    }
  };

  submit = values => {
    this.props.onSubmit(values);
    this.props.handleClose();
  };

  handleDate = date =>
    this.setState(
      {
        date,
      },
      () => this.props.changeDate(date),
    );

  render() {
    const { open, handleClose, classes, handleSubmit, title } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Колличество {title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Добавьте пожалуйста колличество {title} за сегодняшний день
          </DialogContentText>
          <div className={classes.dateArea}>
            <DatePicker value={this.state.date} onChange={this.handleDate} />
          </div>
          <form onSubmit={handleSubmit(this.submit)}>
            <div className={classes.mainArea}>
              <div className={classes.inputArea}>
                <Field
                  autoFocus
                  component={InputTextField}
                  name="balerina"
                  label="Балерина"
                />
                <Field component={InputTextField} name="gourme" label="Гурме" />
                <Field
                  component={InputTextField}
                  name="orient"
                  label="Ориент"
                />
                <Field
                  component={InputTextField}
                  name="symphony"
                  label="Симфония"
                />
                <Field
                  component={InputTextField}
                  name="servus"
                  label="Сервус"
                />
                <Field component={InputTextField} name="sera" label="Сера" />
                <Field component={InputTextField} name="rose" label="Роза" />
              </div>
              <div className={classes.inputArea}>
                <Field component={InputTextField} name="opera" label="Опера" />
                <Field
                  component={InputTextField}
                  name="barista"
                  label="Бариста"
                />
                <Field component={InputTextField} name="nero" label="Неро" />
                <Field
                  component={InputTextField}
                  name="italia"
                  label="Италия"
                />
                <Field
                  component={InputTextField}
                  name="marone"
                  label="Мароне"
                />
                <Field component={InputTextField} name="pura" label="Пура" />
                <Field component={InputTextField} name="verde" label="Верде" />
              </div>
              <div className={classes.inputArea}>
                <Field component={InputTextField} name="cote" label="Коте" />
                <Field
                  component={InputTextField}
                  name="trope"
                  label="С. Тропе"
                />
                <Field component={InputTextField} name="java" label="Ява" />
                <Field
                  component={InputTextField}
                  name="efiopia"
                  label="Эфиопия"
                />
                <Field
                  component={InputTextField}
                  name="columbia"
                  label="Колумбия"
                />
                <Field component={InputTextField} name="crema" label="Крема" />
              </div>
            </div>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary">
                Отменить
              </Button>
              <Button type="submit" variant="contained" color="secondary">
                Добавить
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mDTP = dispatch => ({
  changeDate: value => dispatch(Creators.setDateTransaction(value)),
});

export default compose(
  withStyles(styles),
  reduxForm({ form: 'sales', enableReinitialize: true }),
  connect(
    null,
    mDTP,
  ),
)(FormDialog);
