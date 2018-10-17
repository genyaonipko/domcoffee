/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

import { MainListItems, SecondaryListItems } from '../components/ListItems';
import { getSidebarState, getUserRole } from '../redux/selectors';

import { setSidebarState } from '../redux/actions/sidebar';
import {
  changeDataByDayAction,
  changeDataByMonthAction,
  changeDataByQuarterAction,
  changeDataByYearAction,
  changeDataAction,
} from '../redux/actions/sales';

import {
  changeOwnByDayAction,
  changeOwnByMonthAction,
  changeOwnByQuarterAction,
  changeOwnByYearAction,
  getAllOwnAction,
} from '../redux/actions/own';

import {
  changeCoffeeByDayAction,
  changeCoffeeByMonthAction,
  changeCoffeeByQuarterAction,
  changeCoffeeByYearAction,
  getAllCoffeeAction,
} from '../redux/actions/coffee';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
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
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
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
    changeMonth: PropTypes.func.isRequired,
    changeDay: PropTypes.func.isRequired,
    changeQuarter: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    changeOwnMonth: PropTypes.func.isRequired,
    changeOwnDay: PropTypes.func.isRequired,
    changeOwnQuarter: PropTypes.func.isRequired,
    changeOwnYear: PropTypes.func.isRequired,
    changeCoffeeMonth: PropTypes.func.isRequired,
    changeCoffeeDay: PropTypes.func.isRequired,
    changeCoffeeQuarter: PropTypes.func.isRequired,
    changeCoffeeYear: PropTypes.func.isRequired,
  };

  handleDrawerClose = () => {
    this.props.changeSidebar(!this.props.sidebar);
  };

  changeDay = () => {
    switch (this.props.location.pathname) {
      case '/sales':
        return this.props.changeDay();
      case '/personal':
        return this.props.changeOwnDay();
      case '/coffee':
        return this.props.changeCoffeeDay();
      case '/dashboard':
        this.props.changeCoffeeDay();
        this.props.changeOwnDay();
        this.props.changeDay();
        return 
      default:
        return '';
    }
  };

  changeMonth = () => {
    switch (this.props.location.pathname) {
      case '/sales':
        return this.props.changeMonth();
      case '/personal':
        return this.props.changeOwnMonth();
      case '/coffee':
        return this.props.changeCoffeeMonth();
      case '/dashboard':
        this.props.changeCoffeeMonth();
        this.props.changeOwnMonth();
        this.props.changeMonth();
        return 
      default:
        return '';
    }
  };

  changeQuarter = () => {
    switch (this.props.location.pathname) {
      case '/sales':
        return this.props.changeQuarter();
      case '/personal':
        return this.props.changeOwnQuarter();
      case '/coffee':
        return this.props.changeCoffeeQuarter();
      case '/dashboard':
        this.props.changeCoffeeQuarter();
        this.props.changeOwnQuarter();
        this.props.changeQuarter();
        return 
      default:
        return '';
    }
  };

  changeYear = () => {
    switch (this.props.location.pathname) {
      case '/sales':
        return this.props.changeYear();
      case '/personal':
        return this.props.changeOwnYear();
      case '/coffee':
        return this.props.changeCoffeeYear();
      case '/dashboard':
        this.props.changeCoffeeYear();
        this.props.changeOwnYear();
        this.props.changeYear();
        return 
      default:
        return '';
    }
  };

  getAll = () => {
    switch (this.props.location.pathname) {
      case '/sales':
        return this.props.getAll();
      case '/personal':
        return this.props.getAllOwn();
      case '/coffee':
        return this.props.getAllCoffee();
      case '/dashboard':
        this.props.getAllCoffee();
        this.props.getAllOwn();
        this.props.getAll();
        return 
      default:
        return '';
    }
  };

  render() {
    const { classes, sidebar } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !sidebar && classes.drawerPaperClose,
          ),
        }}
        open={sidebar}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems role={this.props.role} />
        </List>
        <Divider />
        <List>
          <SecondaryListItems
            changeDay={this.changeDay}
            changeMonth={this.changeMonth}
            changeQuarter={this.changeQuarter}
            changeYear={this.changeYear}
            getAll={this.getAll}
          />
        </List>
      </Drawer>
    );
  }
}

const mSTP = state => ({
  role: getUserRole(state),
  sidebar: getSidebarState(state),
});

const mDTP = dispatch => ({
  changeSidebar: bool => dispatch(setSidebarState(bool)),
  changeMonth: () => dispatch(changeDataByMonthAction()),
  changeDay: () => dispatch(changeDataByDayAction()),
  changeQuarter: () => dispatch(changeDataByQuarterAction()),
  changeYear: () => dispatch(changeDataByYearAction()),
  changeOwnMonth: () => dispatch(changeOwnByMonthAction()),
  changeOwnDay: () => dispatch(changeOwnByDayAction()),
  changeOwnQuarter: () => dispatch(changeOwnByQuarterAction()),
  changeOwnYear: () => dispatch(changeOwnByYearAction()),
  getAll: () => dispatch(changeDataAction()),
  getAllOwn: () => dispatch(getAllOwnAction()),
  getAllCoffee: () => dispatch(getAllCoffeeAction()),
  changeCoffeeMonth: () => dispatch(changeCoffeeByMonthAction()),
  changeCoffeeDay: () => dispatch(changeCoffeeByDayAction()),
  changeCoffeeQuarter: () => dispatch(changeCoffeeByQuarterAction()),
  changeCoffeeYear: () => dispatch(changeCoffeeByYearAction()),
});

export default compose(
  connect(
    mSTP,
    mDTP,
  ),
  withStyles(styles),
)(DrawerBar);
