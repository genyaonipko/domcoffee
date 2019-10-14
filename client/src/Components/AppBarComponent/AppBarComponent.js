import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { DatePicker } from '@material-ui/pickers';
import { AuthActions, AuthSelectors } from '../../Reducers/AuthReducers';


import {
  CommonSelectors, CommonActions,
} from '../../Reducers/CommonReducers';

import Images from '../../Resources/Images';
import Language from '../../Language';
import {
  grayColor,
  blackColor,
  hexToRgb,
} from '../../assets/jss/material-dashboard-react';

// const DRAWER_WIDTH = 240;

const styles = theme => ({
  root: {},
  toolbar: {
    paddingRight: theme.spacing(6), // keep right padding when drawer closed
    justifyContent: 'space-between',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: `0 1px 20px 0 rgba(${hexToRgb(blackColor)}, 0.25)`,
    borderBottom: '0',
    marginBottom: '0',
    width: '100%',
    paddingTop: '10px',
    zIndex: '1029',
    color: grayColor[7],
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
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
  section: {
    width: '33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    marginRight: 32,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const AppBarComponent = ({
  classes,
  title,
  logout,
  sidebar,
  user,
  changeSidebar,
  date,
  handleDate,
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

  const renderDatePicker = () => {
    return (
      <div className={classes.datePicker}>
        <DatePicker
          disableFuture
          emptyLabel="Все время"
          value={date}
          onChange={handleDate}
          clearable
        />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar disableGutters={false} className={classes.toolbar}>
          <div className={classes.section}>
            <IconButton
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            {renderTitle()}
          </div>
          <div className={classes.section}>
            <img
              style={{ width: 200 }}
              src={Images.Logo}
              alt="dom-coffee"
            />
          </div>
          <div className={classes.section}>
            {renderDatePicker()}
            {renderAvatar()}
            {renderExitButton()}
          </div>
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
  date: PropTypes.shape({}).isRequired,
  handleDate: PropTypes.func.isRequired,
};

const mSTP = createStructuredSelector({
  role: AuthSelectors.selectRole,
  sidebar: CommonSelectors.selectSidebar,
  user: AuthSelectors.selectUser,
  date: state => state.common.dateFilter,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      logout: AuthActions.logoutUser,
      changeSidebar: CommonActions.Creators.setSidebarState,
      handleDate: CommonActions.Creators.setDateFilter,
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
