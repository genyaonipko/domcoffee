import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Alert extends React.Component {
  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  handleAccept = () => {
    const { handleDelete, handleClose } = this.props;
    handleDelete();
    handleClose();
  };

  render() {
    const { handleClose, open } = this.props;
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            Удаление пользователя
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы действительно хотите удалить пользователя?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
              variant="contained">
              Нет
            </Button>
            <Button
              onClick={this.handleAccept}
              color="secondary"
              variant="contained"
              autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Alert;
