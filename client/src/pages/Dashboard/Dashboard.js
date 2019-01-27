/* eslint-disable */
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
import { changeDataInnerpackAction } from '../../redux/actions/inner/innerpacks';
import { changeDataInnercupAction } from '../../redux/actions/inner/innercups';
import { changeDataOwnpackAction } from '../../redux/actions/own/ownpacks';
import { changeDataOwncupAction } from '../../redux/actions/own/owncups';
import { changePortionsAction } from '../../redux/actions/sales/portions';
import { changeDataDegustationAction } from '../../redux/actions/packs/degustation';

import SimpleLineChart from './components/LineChart';
import SimpleTable from './components/Table';
import AppBarComponent from '../../components/AppBarComponent';

import { reduceAllPositions } from './components/DashboardHelpers';

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

class Dashboard extends React.Component {
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

  renderChartAndTable = (data, tabTitles, classes) =>
    data.map(item => _.findKey(item, o => o !== 0)) ? (
      <div style={{ margin: 24 }}>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          График по всем данным
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart tabTitles={tabTitles} data={data} />
        </Typography>
        <Typography variant="display1" gutterBottom>
          Вся информация
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={data} tableHeaders={tabTitles} />
        </div>
      </div>
    ) : (
      <Typography variant="display1" gutterBottom>
        Нет данных
      </Typography>
    );

  renderContent = (
    packs,
    portions,
    coffee,
    innerpacks,
    ownpacks,
    innercups,
    owncups,
    degustation,
    classes,
    restProps,
  ) => {
    const packsNoPay = reduceAllPositions([coffee, innerpacks, ownpacks]);
    const cupsNoPay = reduceAllPositions([degustation, innercups, owncups]);

    const tab1Data = [packs, portions, packsNoPay, cupsNoPay];
    const tab1Titles = [
      'Пачки за деньги',
      'Чашки за деньги',
      'Пачки бесплатно',
      'Чашки бесплатно',
    ];

    const cupsToPay = reduceAllPositions([
      degustation,
      innercups,
      owncups,
      portions,
    ]);

    const tab2Data = [coffee, cupsToPay];
    const tab2Titles = ['Помол', 'Чашки'];

    return (
      <TabPages tabTitles={['Tab1', 'Tab2']} classes={classes} {...restProps}>
        {this.renderChartAndTable(tab1Data, tab1Titles, classes)}
        {this.renderChartAndTable(tab2Data, tab2Titles, classes)}
      </TabPages>
    );
  };

  render() {
    const {
      classes,
      packs,
      coffee,
      innerpacks,
      ownpacks,
      portions,
      innercups,
      owncups,
      degustation,
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
                portions,
                coffee,
                innerpacks,
                ownpacks,
                innercups,
                owncups,
                degustation,
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
  innerpacks: state.innerpacks,
  innercups: state.innercups,
  ownpacks: state.ownpacks,
  owncups: state.owncups,
  degustation: state.degustation,
  portions: state.portions,
  isLoading: state.settings.isLoading,
});

const mDTP = dispatch => ({
  getAllCoffee: () => dispatch(getAllCoffeeAction()),
  changeData: () => dispatch(changeDataPacksAction()),
  getAllOwn: () => dispatch(changeDataOwnpackAction()),
  getAllPortions: () => dispatch(changePortionsAction()),
  getAllInnerPacks: () => dispatch(changeDataInnerpackAction()),
  getAllDegustation: () => dispatch(changeDataDegustationAction()),
  getAllInnerCups: () => dispatch(changeDataInnercupAction()),
  getAllOwnCups: () => dispatch(changeDataOwncupAction()),
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mSTP,
    mDTP,
  ),
)(Dashboard);
