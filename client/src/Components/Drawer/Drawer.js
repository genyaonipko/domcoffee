import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

import { MainListItems } from './components/ListItems';

import { Creators as AdditionalActions } from '../../Redux/actions/additional/additional';
import { additionalSelectors } from '../../Redux/reducers/additionalReducer';

import { selectRole } from '../../Redux/reducers/authReducer/selectors';

const DRAWER_WIDTH = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: '100vh',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(14),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(16),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class DrawerBar extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    sidebar: PropTypes.bool.isRequired,
    changeSidebar: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
    changeTabBar: PropTypes.func.isRequired,

    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  handleDrawerClose = () => {
    this.props.changeSidebar(!this.props.sidebar);
  };

  handleChangeRoute = () => {
    this.props.changeTabBar(0);
    this.props.changeSidebar(false);
  }

  render() {
    const { classes, sidebar } = this.props;
    return (
      <Drawer
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={sidebar}
        onBackdropClick={this.handleDrawerClose}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems
            role={this.props.role}
            changeTabBar={this.handleChangeRoute}
          />
        </List>
        <Divider />
      </Drawer>
    );
  }
}

const mSTP = createStructuredSelector({
  sidebar: additionalSelectors.selectSidebar,
  role: selectRole,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      changeSidebar: AdditionalActions.setSidebarState,
      changeTabBar: AdditionalActions.setIndexTab,
    },
    dispatch,
  );

export default compose(
  connect(
    mSTP,
    mDTP,
  ),
  withStyles(styles),
)(DrawerBar);
