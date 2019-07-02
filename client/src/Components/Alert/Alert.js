import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Language from '../../Language';

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
            {Language.user.deleteUser}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {Language.user.hasAcceptMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
              variant="contained">
              {Language.actions.no}
            </Button>
            <Button
              onClick={this.handleAccept}
              color="secondary"
              variant="contained"
              autoFocus>
              {Language.actions.yes}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Alert;
