import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import 'moment/locale/ru';
import InputTextField from '../Input';

import { Creators } from '../../Redux/actions/additional/additional';
import { selectAllTransactions } from '../../Redux/reducers/dashboardReducer/selectors';
import Language from '../../Language';
import content from '../SubmitModal/content.json';

const MODAL_WIDTH = 600;

const styles = theme => ({
  paper: {
    // background: 'linear-gradient(45deg, #e3f2fd 30%, #ffebee 90%)',
  },
  mainArea: {
    display: 'flex',
    marginBottom: theme.spacing(4),
    justifyContent: 'space-around',
    minWidth: MODAL_WIDTH - theme.spacing(12),
  },
  dateArea: {
    padding: theme.spacing(4),
  },
  inputArea: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
});

const EditModal = ({
  open,
  handleClose,
  classes,
  handleSubmit,
  title,
  dataTitle,
  data,
  initialize,
  selectIdAction,
  ...props
}) => {
  if (!data) return null;
  const [date, setDate] = useState(null);

  const submit = values => {
    props.onSubmit(values);
    handleClose();
  };

  const handleDate = eventDate => setDate(eventDate);

  const renderDatePicker = () => {
    return (
      <div className={classes.dateArea}>
        <DatePicker
          emptyLabel={Language.editModal.dateLabel}
          value={date}
          onChange={handleDate}
        />
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
          {Language.actions.edit}
        </Button>
      </DialogActions>
    );
  };

  const normalizedData = data[dataTitle].find(
    item => moment(item.createdDate).format('D') === moment(date).format('D'),
  );
  useEffect(() => {
    props.changeDate(date);
    if (normalizedData) {
      initialize(normalizedData.data);
      selectIdAction({ id: normalizedData.key });
    } else {
      initialize({});
      selectIdAction({ id: '' });
    }
  }, [normalizedData, date]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps ={{
        classes: {
         root: classes.paper
        }
      }}
    >
      <div style={{ padding: 16 }}>
        <ContentHeader title={title} />
        {renderDatePicker()}
      </div>
      {normalizedData ? (
        <DialogContent dividers>
          <form onSubmit={handleSubmit(submit)}>
            <div className={classes.mainArea}>
              {content.map(section => (
                <div className={classes.inputArea}>
                  {section.map(field => (
                    <Field
                      styles={{ width: 160 }}
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
      ) : null}
    </Dialog>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  dataTitle: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  initialize: PropTypes.func.isRequired,
  selectIdAction: PropTypes.func.isRequired,
};

const mDTP = dispatch =>
  bindActionCreators(
    {
      changeDate: Creators.setDateTransaction,
    },
    dispatch,
  );

const mSTP = createStructuredSelector({
  data: selectAllTransactions,
});

export default compose(
  memo,
  withStyles(styles),
  reduxForm({ form: 'editModal' }),
  connect(
    mSTP,
    mDTP,
  ),
)(EditModal);

const ContentHeader = ({ title, description }) => (
  <>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    {description ? (
      <>
        <Divider />
        <Typography variant="h7" gutterBottom>
          {description}
        </Typography>
      </>
    ) : null}
  </>
);

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
