import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';

import Loader from '../../components/Loader';

import { getAllCoffeeAction } from '../../redux/actions/coffee';
import { changeDataAction } from '../../redux/actions/sales';
import { getAllOwnAction } from '../../redux/actions/own';

import SimpleLineChart from './components/LineChart';
import SimpleTable from './components/Table';
import AppBarComponent from '../../components/AppBarComponent';

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
  };

  renderContent = (sales, coffee, own, classes) => {
    const tableHeaders = [
      'Марка кофе',
      'Кол-во продаж',
      'Кол-во помола',
      'Кол-во личного употребления',
    ];

    return _.findKey(coffee, o => o !== 0) &&
      _.findKey(sales, o => o !== 0) &&
      _.findKey(own, o => o !== 0) ? (
      <Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          График по всем данным
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart data={{ sales, coffee, own }} />
        </Typography>
        <Typography variant="display1" gutterBottom>
          Вся информация
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable
            data={{ sales, coffee, own }}
            tableHeaders={tableHeaders}
          />
        </div>
      </Fragment>
    ) : (
      <Typography variant="display1" gutterBottom>
        Нет данных
      </Typography>
    );
  };

  render() {
    const { classes, sales, coffee, own, isLoading } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Дашбоард" />
          <main className={classes.content}>
            {!isLoading ? (
              this.renderContent(sales, coffee, own, classes)
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
  sales: PropTypes.shape({}).isRequired,
  coffee: PropTypes.shape({}).isRequired,
  getAllOwn: PropTypes.func.isRequired,
  own: PropTypes.shape({}).isRequired,
};

const mSTP = state => ({
  sales: state.sales,
  coffee: state.coffee,
  own: state.own,
  isLoading: state.settings.isLoading,
});

const mDTP = dispatch => ({
  getAllCoffee: () => dispatch(getAllCoffeeAction()),
  changeData: () => dispatch(changeDataAction()),
  getAllOwn: () => dispatch(getAllOwnAction()),
});

export default withRouter(
  compose(
    withStyles(styles),
    connect(
      mSTP,
      mDTP,
    ),
  )(Dashboard),
);
