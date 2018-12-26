/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from '../components/Charts/LineChart';
import SimpleTable from '../components/Table';
import Loader from '../components/Loader';

export default class ChartPage extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    const {
      classes,
      data,
      tableHeaders,
      chartTitle,
      tableTitle,
      isLoading,
    } = this.props;
    if (isLoading) return <Loader />;
    if (!_.findKey(data, o => o !== 0)) {
      return (
        <div style={{ margin: 24 }}>
          <Typography variant="display1" gutterBottom>
            Нет данных
          </Typography>
        </div>
      );
    }
    return (
      <div style={{ margin: 24 }}>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          {chartTitle}
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart color="#FF0000" data={data} legend={tableTitle} />
        </Typography>
        <Typography variant="display1" gutterBottom>
          {tableTitle}
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={data} tableHeaders={tableHeaders} />
        </div>
      </div>
    );
  }
}
