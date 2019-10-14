import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const SNACKBAR_HIDE_DELAY = 4000;

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(4),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const SnackBar = ({ className, message, visible, onClose, type, anchorOrigin, ...rest }) => {
  const Icon = variantIcon[type];
  const classes = useStyles();

  const renderMessage = () => (
    <span id="client-snackbar" className={classes.message}>
      <Icon className={classNames(classes.icon, classes.iconVariant)} />
      {message}
    </span>
  );

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={visible}
      autoHideDuration={SNACKBAR_HIDE_DELAY}>
      <SnackbarContent
        className={classes[type]}
        aria-describedby="client-snackbar"
        message={renderMessage()}
        {...rest}
      />
    </Snackbar>
  );
};

SnackBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  visible: PropTypes.bool.isRequired,
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.string.isRequired,
    vertical: PropTypes.string.isRequired,
  }),
};

SnackBar.defaultProps = {
  anchorOrigin: {
    horizontal: 'left',
    vertical: 'bottom',
  }
}

export default React.memo(SnackBar);
