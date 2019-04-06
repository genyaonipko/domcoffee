import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';
import { equals } from 'ramda';


import Loader from '../../components/Loader';

import SalesActions from '../../redux/actions/sales';
import PacksActions from '../../redux/actions/packs';
import InnerActions from '../../redux/actions/inner';
import OwnActions from '../../redux/actions/own';

import { selectDashboardTab1 } from '../../redux/reducers/dashboardReducer/selectors';
import {
  additionalSelectors
} from '../../redux/reducers/additionalReducer';

import SimpleLineChart from './components/LineChart';
import SimpleTable from './components/Table';
import AppBarComponent from '../../components/AppBarComponent';

import TabPages from '../../components/TabPage';

const styles = () => ({
  root: {
    display: 'flex',
    flex: 1,
    width: window.innerWidth - 240,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: 64,
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends React.PureComponent {
  componentDidMount = () => {
    Promise.all([
      this.props.changeData(),
      this.props.getAllCoffee(),
      this.props.getAllOwn(),
      this.props.getAllPortions(),
      this.props.getAllInnerPacks(),
      this.props.getAllDegustation(),
      this.props.getAllInnerCups(),
      this.props.getAllOwnCups(),
    ]);
  };

  shouldComponentUpdate = nextProps => !equals(this.props, nextProps);

  renderChartAndTable = (data, tabTitles, classes) =>
    data.map(item => _.findKey(item, o => o !== 0)) ? (
      <div style={{ margin: 24 }}>
        <div className={classes.appBarSpacer} />
        <Typography variant="h4" gutterBottom>
          График по всем данным
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart tabTitles={tabTitles} data={data} />
        </Typography>
        <Typography variant="h4" gutterBottom>
          Вся информация
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={data} tableHeaders={tabTitles} />
        </div>
      </div>
    ) : (
      <Typography variant="h2" gutterBottom>
        Нет данных
      </Typography>
    );

  renderContent = () => {
    const {
      classes,
      dashboardTab1,
      isLoading,
      ...restProps
    } = this.props;
    const tab1Titles = [
      'Пачки за деньги',
      'Чашки за деньги',
      'Пачки бесплатно',
      'Чашки бесплатно',
    ];
    // const tab2Titles = ['Помол', 'Чашки'];

    return (
      <TabPages tabTitles={['Tab1', 'Tab2']} classes={classes} {...restProps}>
        {this.renderChartAndTable(dashboardTab1, tab1Titles, classes)}
      </TabPages>
    );
  };

  render() {
    const { classes, isLoading } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Дашбоард" />
          <main className={classes.content}>
            {!isLoading ? (
              this.renderContent()
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
  // settings
  classes: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,

  // data
  dashboardTab1: PropTypes.arrayOf(PropTypes.arrayOf({})).isRequired,

  // functions
  changeData: PropTypes.func.isRequired,
  getAllOwn: PropTypes.func.isRequired,
  getAllCoffee: PropTypes.func.isRequired,
  getAllPortions: PropTypes.func.isRequired,
  getAllInnerPacks: PropTypes.func.isRequired,
  getAllDegustation: PropTypes.func.isRequired,
  getAllInnerCups: PropTypes.func.isRequired,
  getAllOwnCups: PropTypes.func.isRequired,
};

const mSTP = createStructuredSelector({
  isLoading: additionalSelectors.selectLoader,
  dashboardTab1: selectDashboardTab1,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllCoffee: SalesActions.changeDataCoffeeAction,
      getAllPortions: SalesActions.changeDataPortionAction,
      changeData: PacksActions.changeDataPacksAction,
      getAllOwn: OwnActions.changeDataOwnpackAction,
      getAllInnerPacks: InnerActions.changeDataInnerpackAction,
      getAllDegustation: PacksActions.changeDataDegustationAction,
      getAllInnerCups: InnerActions.changeDataInnercupAction,
      getAllOwnCups: OwnActions.changeDataOwncupAction,
    },
    dispatch,
  );

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mSTP,
    mDTP,
  ),
)(Dashboard);
