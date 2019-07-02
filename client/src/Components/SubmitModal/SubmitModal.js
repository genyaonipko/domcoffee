import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'moment/locale/ru';
import InputTextField from '../Input';
import content from './content.json';

import { Creators } from '../../Redux/actions/additional/additional';
import Language from '../../Language';

const styles = theme => ({
  mainArea: {
    display: 'flex',
    marginBottom: theme.spacing(4), 
  },
  inputArea: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  dateArea: {
    padding: theme.spacing(4),
  },
});

const CURRENT_DATE = moment();
const CONTENT_TO_RENDER = content;

const SubmitModal = ({
  open,
  handleClose,
  classes,
  handleSubmit,
  title,
  ...props
}) => {
  const [date, setDate] = useState(CURRENT_DATE);

  useEffect(() => {
    props.reset();
  }, [open]);

  useEffect(() => {
    props.changeDate(date);
  }, [date]);

  const submit = values => {
    props.onSubmit(values);
    handleClose();
  };

  const handleDate = eventDate => setDate(eventDate);

  const renderDatePicker = () => {
    return (
      <div className={classes.dateArea}>
        <DatePicker value={date} onChange={handleDate} />
      </div>
    );
  };

  const renderActionButtons = () => {
    return (
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          {Language.actions.decline}
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          {Language.actions.add}
        </Button>
      </DialogActions>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <div style={{ padding: 16 }}>
        <ContentTitle title={title} />
        {renderDatePicker()}
      </div>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(submit)}>
          <div className={classes.mainArea}>
            {CONTENT_TO_RENDER.map((section, x) => (
              <div className={classes.inputArea}>
                {section.map((field, y) => (
                  <Field
                    autoFocus={!x && !y}
                    component={InputTextField}
                    name={field.name}
                    label={field.label}
                  />
                ))}
              </div>
            ))}
          </div>
          {renderActionButtons()}
        </form>
      </DialogContent>
    </Dialog>
  );
};

SubmitModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
};

const mDTP = dispatch => bindActionCreators({
  changeDate: Creators.setDateTransaction,
}, dispatch);

export default compose(
  memo,
  withStyles(styles),
  reduxForm({ form: 'modal', enableReinitialize: true }),
  connect(
    null,
    mDTP,
  ),
)(SubmitModal);

const ContentTitle = ({ title }) => (
  <Typography variant="h4" gutterBottom>
    {Language.count} {title}
  </Typography>
);

ContentTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
