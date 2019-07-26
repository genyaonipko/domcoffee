import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    backgroundColor: theme.palette.primary
  },
  directionUp: {},
}));

const SpeedDials = ({ addAction, editAction }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      className={classes.fab}
      icon={<SpeedDialIcon />}
      onBlur={handleClose}
      onClick={handleClick}
      onClose={handleClose}
      onFocus={handleOpen}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      open={open}
    >
      <SpeedDialAction
        icon={<AddIcon />}
        tooltipTitle="Добавить"
        onClick={addAction}
      />
      <SpeedDialAction
        icon={<EditIcon />}
        tooltipTitle="Изменить"
        onClick={editAction}
      />
    </SpeedDial>
  );
}

SpeedDials.propTypes = {
  addAction: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
};

export default (SpeedDials);