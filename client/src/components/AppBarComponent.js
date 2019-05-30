import React, { Component } from 'react';
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
import { logoutUser } from '../redux/actions/authentication';

import { Creators as AdditionalActions } from '../redux/actions/additional/additional';

import { selectRole, selectUser } from '../redux/reducers/authReducer/selectors';
import { additionalSelectors } from '../redux/reducers/additionalReducer';

import Images from '../resources/Images';

const drawerWidth = 240;

const styles = theme => ({
  root: {},
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
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
    marginLeft: 32,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark,
  },
});

class AppBarComponent extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    logout: PropTypes.func.isRequired,
    changeSidebar: PropTypes.func.isRequired,
    sidebar: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  handleDrawerOpen = () => {
    this.props.changeSidebar(!this.props.sidebar);
  };

  render() {
    const { classes, title, logout, sidebar, user } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, sidebar && classes.appBarShift)}>
          <Toolbar disableGutters={!sidebar} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                sidebar && classes.menuButtonHidden,
              )}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {title}
            </Typography>
            <img style={{ width: 200, marginRight: 20 }} src={Images.Logo} alt="dom-coffee" />
            <Avatar className={classes.avatar}>
              {user.name
                .split(' ')
                .map(item => item.charAt(0))
                .join('')
                .toUpperCase()}
            </Avatar>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonLogOut}
              onClick={() => logout()}>
              <ExitIcon />
              Выход
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

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
