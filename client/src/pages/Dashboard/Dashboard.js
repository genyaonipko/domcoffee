import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';

import Loader from '../../components/Loader';

import { getAllCoffeeAction } from '../../redux/actions/sales/coffee';
import { changeDataPacksAction } from '../../redux/actions/packs/packs';
import { changeDataOwnpackAction } from '../../redux/actions/own/ownpacks';
import { changePortionsAction } from '../../redux/actions/sales/portions';

import SimpleLineChart from './components/LineChart';
import SimpleTable from './components/Table';
import AppBarComponent from '../../components/AppBarComponent';

// import { reduceAllPositions } from './components/DashboardHelpers';

import TabPages from '../../components/TabPage';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    width: window.innerWidth - 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    paddingTop: 88,
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends React.Component {
  componentDidMount = () => {
    this.props.changeData();
    this.props.getAllCoffee();
    this.props.getAllOwn();
    this.props.getAllPortions();
  };

  renderChartAndTable = (packs, tableHeaders, data, classes) =>
    _.findKey(packs, o => o !== 0) ? (
      <Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          График по всем данным
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart data={data} />
        </Typography>
        <Typography variant="display1" gutterBottom>
          Вся информация
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={data} tableHeaders={tableHeaders} />
        </div>
      </Fragment>
    ) : (
      <Typography variant="display1" gutterBottom>
        Нет данных
      </Typography>
    );

  renderContent = (packs, coffee, own, portions, classes, restProps) => {
    const tableHeaders = [
      'Марка кофе',
      'Кол-во продаж',
      'Кол-во помола',
      'Кол-во личного употребления',
      'Кол-во порций',
    ];

    const tab1Data = { packs };

    // const tab1Inform = reduceAllPositions()
    return (
      <TabPages tabTitles={['Tab1', 'Tab2']} classes={classes} {...restProps}>
        {this.renderChartAndTable(packs, tableHeaders, tab1Data, classes)}
      </TabPages>
    );
  };

  render() {
    const {
      classes,
      packs,
      coffee,
      own,
      portions,
      isLoading,
      ...restProps
    } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Дашбоард" />
          <main className={classes.content}>
            {!isLoading ? (
              this.renderContent(
                packs,
                coffee,
                own,
                portions,
                classes,
                restProps,
              )
            ) : (
              <Loader />
            )}
          </main>
        </div>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  changeData: PropTypes.func.isRequired,
  getAllCoffee: PropTypes.func.isRequired,
  packs: PropTypes.shape({}).isRequired,
  coffee: PropTypes.shape({}).isRequired,
  getAllOwn: PropTypes.func.isRequired,
  own: PropTypes.shape({}).isRequired,
  portions: PropTypes.shape({}).isRequired,
  getAllPortions: PropTypes.func.isRequired,
};

const mSTP = state => ({
  packs: state.packs,
  coffee: state.coffee,
  own: state.own,
  portions: state.portions,
  isLoading: state.settings.isLoading,
});

const mDTP = dispatch => ({
  getAllCoffee: () => dispatch(getAllCoffeeAction()),
  changeData: () => dispatch(changeDataPacksAction()),
  getAllOwn: () => dispatch(changeDataOwnpackAction()),
  getAllPortions: () => dispatch(changePortionsAction()),
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mSTP,
    mDTP,
  ),
)(Dashboard);
