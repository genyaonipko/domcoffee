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
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

import { MainListItems, SecondaryListItems } from './ListItems';

import { Creators as AdditionalActions } from '../redux/actions/additional/additional';
import {
  additionalSelectors
} from '../redux/reducers/additionalReducer';

import OwnActions from '../redux/actions/own';
import SalesActions from '../redux/actions/sales';
import PacksActions from '../redux/actions/packs';
import InnerActions from '../redux/actions/inner';

import { selectRole } from '../redux/reducers/authReducer/selectors';

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

    // coffee
    changeDataCoffeeAction: PropTypes.func.isRequired,
    coffeeByDayAction: PropTypes.func.isRequired,
    coffeeByMonthAction: PropTypes.func.isRequired,
    coffeeByQuarterAction: PropTypes.func.isRequired,
    coffeeByYearAction: PropTypes.func.isRequired,

    // portions
    changeDataPortionAction: PropTypes.func.isRequired,
    portionByDayAction: PropTypes.func.isRequired,
    portionByMonthAction: PropTypes.func.isRequired,
    portionByQuarterAction: PropTypes.func.isRequired,
    portionByYearAction: PropTypes.func.isRequired,

    // packs
    changeDataPacksAction: PropTypes.func.isRequired,
    packsByDayAction: PropTypes.func.isRequired,
    packsByMonthAction: PropTypes.func.isRequired,
    packsByQuarterAction: PropTypes.func.isRequired,
    packsByYearAction: PropTypes.func.isRequired,

    // degustation
    changeDataDegustationsAction: PropTypes.func.isRequired,
    degustationByDayAction: PropTypes.func.isRequired,
    degustationByMonthAction: PropTypes.func.isRequired,
    degustationByQuarterAction: PropTypes.func.isRequired,
    degustationByYearAction: PropTypes.func.isRequired,

    // owncups
    changeDataOwncupAction: PropTypes.func.isRequired,
    owncupByDayAction: PropTypes.func.isRequired,
    owncupByMonthAction: PropTypes.func.isRequired,
    owncupByQuarterAction: PropTypes.func.isRequired,
    owncupByYearAction: PropTypes.func.isRequired,

    // ownpacks
    changeDataOwnpacksAction: PropTypes.func.isRequired,
    ownpacksByDayAction: PropTypes.func.isRequired,
    ownpacksByMonthAction: PropTypes.func.isRequired,
    ownpacksByQuarterAction: PropTypes.func.isRequired,
    ownpacksByYearAction: PropTypes.func.isRequired,


    // innercups
    changeDataInnercupAction: PropTypes.func.isRequired,
    innercupByDayAction: PropTypes.func.isRequired,
    innercupByMonthAction: PropTypes.func.isRequired,
    innercupByQuarterAction: PropTypes.func.isRequired,
    innercupByYearAction: PropTypes.func.isRequired,

    // innerpacks
    changeDataInnerpackAction: PropTypes.func.isRequired,
    innerpackByDayAction: PropTypes.func.isRequired,
    innerpackByMonthAction: PropTypes.func.isRequired,
    innerpackByQuarterAction: PropTypes.func.isRequired,
    innerpackByYearAction: PropTypes.func.isRequired,

    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  getAll = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.changeDataPacksAction(),
          this.props.changeDataDegustationsAction(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.changeDataCoffeeAction(),
          this.props.changeDataPortionAction(),
        ]);
      case '/inner':
        return Promise.all([
          this.props.changeDataInnercupAction(),
          this.props.changeDataInnerpackAction(),
        ]);
      case '/own':
        return Promise.all([
          this.props.changeDataOwncupAction(),
          this.props.changeDataOwnpacksAction(),
        ]);
      case '/dashboard':
        return Promise.all([
          this.props.changeDataPacksAction(),
          this.props.changeDataDegustationsAction(),
          this.props.changeDataCoffeeAction(),
          this.props.changeDataPortionAction(),
          this.props.changeDataInnercupAction(),
          this.props.changeDataInnerpackAction(),
          this.props.changeDataOwncupAction(),
          this.props.changeDataOwnpacksAction(),
        ])

      default:
        return null;
    }
  }

  changeDay = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.degustationByDayAction(),
          this.props.packsByDayAction(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.coffeeByDayAction(),
          this.props.portionByDayAction(),
        ]);
      case '/inner':
        return Promise.all([
          this.props.innercupByDayAction(),
          this.props.innerpackByDayAction(),
        ]);
      case '/own':
        return Promise.all([
          this.props.owncupByDayAction(),
          this.props.ownpacksByDayAction(),
        ]);
      case '/dashboard':
        return Promise.all([
          this.props.coffeeByDayAction(),
          this.props.portionByDayAction(),
          this.props.degustationByDayAction(),
          this.props.packsByDayAction(),
          this.props.ownpacksByDayAction(),
          this.props.owncupByDayAction(),
          this.props.innercupByDayAction(),
          this.props.innerpackByDayAction(),
        ])

      default:
        return null;
    }
  };

  changeMonth = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.degustationByMonthAction(),
          this.props.packsByMonthAction(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.coffeeByMonthAction(),
          this.props.portionByMonthAction(),
        ]);
      case '/inner':
        return Promise.all([
          this.props.innercupByMonthAction(),
          this.props.innerpackByMonthAction(),
        ]);
      case '/own':
        return Promise.all([
          this.props.owncupByMonthAction(),
          this.props.ownpacksByMonthAction(),
        ]);
      case '/dashboard':
        return Promise.all([
          this.props.coffeeByMonthAction(),
          this.props.portionByMonthAction(),
          this.props.degustationByMonthAction(),
          this.props.packsByMonthAction(),
          this.props.ownpacksByMonthAction(),
          this.props.owncupByMonthAction(),
          this.props.innercupByMonthAction(),
          this.props.innerpackByMonthAction(),
        ])

      default:
        return null;
    }
  };

  changeQuarter = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.degustationByQuarterAction(),
          this.props.packsByQuarterAction(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.coffeeByQuarterAction(),
          this.props.portionByQuarterAction(),
        ]);
      case '/inner':
        return Promise.all([
          this.props.innercupByQuarterAction(),
          this.props.innerpackByQuarterAction(),
        ]);
      case '/own':
        return Promise.all([
          this.props.owncupByQuarterAction(),
          this.props.ownpacksByQuarterAction(),
        ]);
      case '/dashboard':
        return Promise.all([
          this.props.coffeeByQuarterAction(),
          this.props.portionByQuarterAction(),
          this.props.degustationByQuarterAction(),
          this.props.packsByQuarterAction(),
          this.props.ownpacksByQuarterAction(),
          this.props.owncupByQuarterAction(),
          this.props.innercupByQuarterAction(),
          this.props.innerpackByQuarterAction(),
        ])

      default:
        return null;
    }
  };

  changeYear = () => {
    switch (this.props.location.pathname) {
      case '/packs':
        return Promise.all([
          this.props.degustationByYearAction(),
          this.props.packsByYearAction(),
        ]);
      case '/sales':
        return Promise.all([
          this.props.coffeeByYearAction(),
          this.props.portionByYearAction(),
        ]);
      case '/inner':
        return Promise.all([
          this.props.innercupByYearAction(),
          this.props.innerpackByYearAction(),
        ]);
      case '/own':
        return Promise.all([
          this.props.owncupByYearAction(),
          this.props.ownpacksByYearAction(),
        ]);
      case '/dashboard':
        return Promise.all([
          this.props.coffeeByYearAction(),
          this.props.portionByYearAction(),
          this.props.degustationByYearAction(),
          this.props.packsByYearAction(),
          this.props.ownpacksByYearAction(),
          this.props.owncupByYearAction(),
          this.props.innercupByYearAction(),
          this.props.innerpackByYearAction(),
        ])

      default:
        return null;
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

const mSTP = createStructuredSelector({
  sidebar: additionalSelectors.selectSidebar,
  role: selectRole,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      changeSidebar: AdditionalActions.setSidebarState,
      changeTabBar: AdditionalActions.setIndexTab,

      // coffee
      changeDataCoffeeAction: SalesActions.changeDataCoffeeAction,
      coffeeByDayAction: SalesActions.coffeeByDayAction,
      coffeeByMonthAction: SalesActions.coffeeByMonthAction,
      coffeeByQuarterAction: SalesActions.coffeeByQuarterAction,
      coffeeByYearAction: SalesActions.coffeeByYearAction,

      // portions
      changeDataPortionAction: SalesActions.changeDataPortionAction,
      portionByDayAction: SalesActions.portionByDayAction,
      portionByMonthAction: SalesActions.portionByMonthAction,
      portionByQuarterAction: SalesActions.portionByQuarterAction,
      portionByYearAction: SalesActions.portionByYearAction,

      // packs
      changeDataPacksAction: PacksActions.changeDataPacksAction,
      packsByDayAction: PacksActions.packsByDayAction,
      packsByMonthAction: PacksActions.packsByMonthAction,
      packsByQuarterAction: PacksActions.packsByQuarterAction,
      packsByYearAction: PacksActions.packsByYearAction,

      // degustation
      changeDataDegustationsAction: PacksActions.changeDataDegustationAction,
      degustationByDayAction: PacksActions.degustationByDayAction,
      degustationByMonthAction: PacksActions.degustationByMonthAction,
      degustationByQuarterAction: PacksActions.degustationByQuarterAction,
      degustationByYearAction: PacksActions.degustationByYearAction,

      // owncups
      changeDataOwncupAction: OwnActions.changeDataOwncupAction,
      owncupByDayAction: OwnActions.owncupByDayAction,
      owncupByMonthAction: OwnActions.owncupByMonthAction,
      owncupByQuarterAction: OwnActions.owncupByQuarterAction,
      owncupByYearAction: OwnActions.owncupByYearAction,

      // ownpacks
      changeDataOwnpacksAction: OwnActions.changeDataOwnpackAction,
      ownpacksByDayAction: OwnActions.ownpacksByDayAction,
      ownpacksByMonthAction: OwnActions.ownpacksByMonthAction,
      ownpacksByQuarterAction: OwnActions.ownpacksByQuarterAction,
      ownpacksByYearAction: OwnActions.ownpacksByYearAction,


      // innercups
      changeDataInnercupAction: InnerActions.changeDataInnercupAction,
      innercupByDayAction: InnerActions.innercupByDayAction,
      innercupByMonthAction: InnerActions.innercupByMonthAction,
      innercupByQuarterAction: InnerActions.innercupByQuarterAction,
      innercupByYearAction: InnerActions.innercupByYearAction,

      // innerpacks
      changeDataInnerpackAction: InnerActions.changeDataInnerpackAction,
      innerpackByDayAction: InnerActions.innerpackByDayAction,
      innerpackByMonthAction: InnerActions.innerpackByMonthAction,
      innerpackByQuarterAction: InnerActions.innerpackByQuarterAction,
      innerpackByYearAction: InnerActions.innerpackByYearAction,
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
