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

import { setSidebarState, setTabIndex } from '../redux/actions/sidebar';

import {
  changeCoffeeByDayAction,
  changeCoffeeByMonthAction,
  changeCoffeeByQuarterAction,
  changeCoffeeByYearAction,
  getAllCoffeeAction,
} from '../redux/actions/sales/coffee';

import {
  changePortionsByDayAction,
  changePortionsByMonthAction,
  changePortionsByQuarterAction,
  changePortionsByYearAction,
  changePortionsAction,
} from '../redux/actions/sales/portions';

import {
  changeDataByDayAction,
  changeDataByMonthAction,
  changeDataByQuarterAction,
  changeDataByYearAction,
  changeDataPacksAction,
} from '../redux/actions/packs/packs';

import {
  degustationByDayAction,
  degustationByMonthAction,
  degustationByQuarterAction,
  degustationByYearAction,
  changeDataDegustationAction,
} from '../redux/actions/packs/degustation';

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
    changeTabBar: PropTypes.func.isRequired,

    // sales
    changeMonth: PropTypes.func.isRequired,
    changeDay: PropTypes.func.isRequired,
    changeQuarter: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    getAll: PropTypes.func.isRequired,

    // degustation
    changeDegustationMonth: PropTypes.func.isRequired,
    changeDegustationDay: PropTypes.func.isRequired,
    changeDegustationQuarter: PropTypes.func.isRequired,
    changeDegustationYear: PropTypes.func.isRequired,
    getAllDegustation: PropTypes.func.isRequired,

    // coffee
    changeCoffeeMonth: PropTypes.func.isRequired,
    changeCoffeeDay: PropTypes.func.isRequired,
    changeCoffeeQuarter: PropTypes.func.isRequired,
    changeCoffeeYear: PropTypes.func.isRequired,
    getAllCoffee: PropTypes.func.isRequired,

    // portions
    changePortionsMonth: PropTypes.func.isRequired,
    changePortionsDay: PropTypes.func.isRequired,
    changePortionsQuarter: PropTypes.func.isRequired,
    changePortionsYear: PropTypes.func.isRequired,
    getAllPortions: PropTypes.func.isRequired,

    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  getAll = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.getAll(),
          this.props.getAllDegustation(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.getAllPortions(),
          this.props.getAllCoffee(),
        ]);
      case '/inner':
        return this.props.getAllDegustation();
      case '/own':
        return '';
      case '/dashboard':
        this.props.getAllCoffee();
        this.props.getAllDegustation();
        this.props.getAll();
        return this.props.getAllPortions();
      default:
        return '';
    }
  };

  changeDay = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.changeDay(),
          this.props.changeDegustationDay(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.changeCoffeeDay(),
          this.props.changePortionsDay(),
        ]);
      case '/inner':
        return this.props.changeCoffeeDay();
      case '/own':
        return this.props.changePortionsDay();
      case '/dashboard':
        this.props.changeCoffeeDay();
        this.props.changeDegustationDay();
        this.props.changeDay();
        return this.props.changePortionsDay();
      default:
        return '';
    }
  };

  changeMonth = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.changeMonth(),
          this.props.changeDegustationMonth(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.changeCoffeeMonth(),
          this.props.changePortionsMonth(),
        ]);
      case '/inner':
        return this.props.changeCoffeeMonth();
      case '/own':
        return this.props.changePortionsMonth();
      case '/dashboard':
        this.props.changeCoffeeMonth();
        this.props.changeDegustationMonth();
        this.props.changeMonth();
        return this.props.changePortionsMonth();
      default:
        return '';
    }
  };

  changeQuarter = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.changeQuarter(),
          this.props.changeDegustationQuarter(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.changeCoffeeQuarter(),
          this.props.changePortionsQuarter(),
        ]);
      case '/inner':
        return this.props.changeCoffeeQuarter();
      case '/own':
        return this.props.changePortionsQuarter();
      case '/dashboard':
        this.props.changeCoffeeQuarter();
        this.props.changeDegustationQuarter();
        this.props.changeQuarter();
        return this.props.changePortionsQuarter();
      default:
        return '';
    }
  };

  changeYear = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.changeYear(),
          this.props.changeDegustationYear(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.changeCoffeeYear(),
          this.props.changePortionsYear(),
        ]);
      case '/inner':
        return this.props.changeCoffeeYear();
      case '/own':
        return this.props.changePortionsYear();
      case '/dashboard':
        this.props.changeCoffeeYear();
        this.props.changeDegustationYear();
        this.props.changeYear();
        return this.props.changePortionsYear();
      default:
        return '';
    }
  };

  handleDrawerClose = () => {
    this.props.changeSidebar(!this.props.sidebar);
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
          <MainListItems
            role={this.props.role}
            changeTabBar={this.props.changeTabBar}
          />
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
  changeTabBar: index => dispatch(setTabIndex(index)),

  // sales
  changeMonth: () => dispatch(changeDataByMonthAction()),
  changeDay: () => dispatch(changeDataByDayAction()),
  changeQuarter: () => dispatch(changeDataByQuarterAction()),
  changeYear: () => dispatch(changeDataByYearAction()),
  getAll: () => dispatch(changeDataPacksAction()),

  // degustation
  changeDegustationMonth: () => dispatch(degustationByMonthAction()),
  changeDegustationDay: () => dispatch(degustationByDayAction()),
  changeDegustationQuarter: () => dispatch(degustationByQuarterAction()),
  changeDegustationYear: () => dispatch(degustationByYearAction()),
  getAllDegustation: () => dispatch(changeDataDegustationAction()),

  // coffee
  changeCoffeeMonth: () => dispatch(changeCoffeeByMonthAction()),
  changeCoffeeDay: () => dispatch(changeCoffeeByDayAction()),
  changeCoffeeQuarter: () => dispatch(changeCoffeeByQuarterAction()),
  changeCoffeeYear: () => dispatch(changeCoffeeByYearAction()),
  getAllCoffee: () => dispatch(getAllCoffeeAction()),

  // portions
  changePortionsMonth: () => dispatch(changePortionsByMonthAction()),
  changePortionsDay: () => dispatch(changePortionsByDayAction()),
  changePortionsQuarter: () => dispatch(changePortionsByQuarterAction()),
  changePortionsYear: () => dispatch(changePortionsByYearAction()),
  getAllPortions: () => dispatch(changePortionsAction()),
});

export default compose(
  connect(
    mSTP,
    mDTP,
  ),
  withStyles(styles),
)(DrawerBar);
