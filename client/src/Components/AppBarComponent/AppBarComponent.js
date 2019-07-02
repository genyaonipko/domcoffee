import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { logoutUser } from '../../Redux/actions/authentication';

import { Creators as AdditionalActions } from '../../Redux/actions/additional/additional';

import {
  selectRole,
  selectUser,
} from '../../Redux/reducers/authReducer/selectors';
import { additionalSelectors } from '../../Redux/reducers/additionalReducer';

import Images from '../../Resources/Images';
import Language from '../../Language';

const DRAWER_WIDTH = 240;

const styles = theme => ({
  root: {},
  toolbar: {
    paddingRight: theme.spacing(6), // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(9),
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  buttonLogOut: {
    width: 100,
    marginLeft: theme.spacing(8),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark,
  },
});

const AppBarComponent = ({
  classes,
  title,
  logout,
  sidebar,
  user,
  changeSidebar,
}) => {
  const handleDrawerOpen = () => {
    changeSidebar(!sidebar);
  };

  const renderAvatar = () => (
    <Avatar className={classes.avatar}>
      {user.name
        .split(' ')
        .map(item => item.charAt(0))
        .join('')
        .toUpperCase()}
    </Avatar>
  );

  const renderExitButton = () => (
    <Button
      variant="contained"
      color="secondary"
      className={classes.buttonLogOut}
      onClick={logout}>
      <ExitIcon />
      {Language.actions.exit}
    </Button>
  );

  const renderTitle = () => (
    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
      {title}
    </Typography>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, sidebar && classes.appBarShift)}>
        <Toolbar disableGutters={!sidebar} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              sidebar && classes.menuButtonHidden,
            )}>
            <MenuIcon />
          </IconButton>
          {renderTitle()}
          <img
            style={{ width: 200, marginRight: 20 }}
            src={Images.Logo}
            alt="dom-coffee"
          />
          {renderAvatar()}
          {renderExitButton()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppBarComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  logout: PropTypes.func.isRequired,
  changeSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mSTP = createStructuredSelector({
  role: selectRole,
  sidebar: additionalSelectors.selectSidebar,
  user: selectUser,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      logout: logoutUser,
      changeSidebar: AdditionalActions.setSidebarState,
    },
    dispatch,
  );

export default compose(
  connect(
    mSTP,
    mDTP,
  ),
  withStyles(styles),
)(AppBarComponent);
