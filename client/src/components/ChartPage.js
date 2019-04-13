import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from '../components/Charts/LineChart';
import SimpleTable from '../components/Table';
import Loader from '../components/Loader';

export default class ChartPage extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    tableHeaders: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    chartTitle: PropTypes.string.isRequired,
    tableTitle: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    chartColor: PropTypes.string.isRequired,
    concatData: PropTypes.number.isRequired,
  };

  render() {
    const {
      classes,
      data,
      tableHeaders,
      chartTitle,
      tableTitle,
      isLoading,
      chartColor,
      concatData,
    } = this.props;

    if (isLoading) return <Loader />;
    if (!_.findKey(data, o => o !== 0)) {
      return (
        <div style={{ margin: 24 }}>
          <Typography variant="h2" gutterBottom>
            Нет данных
          </Typography>
        </div>
      );
    }
    return (
      <div style={{ margin: 24 }}>
        <div className={classes.appBarSpacer} />
        <Typography variant="h4" gutterBottom>
          {chartTitle}
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart color={chartColor} data={data} legend={tableTitle} />
        </Typography>
        <Typography variant="h4" gutterBottom>
          {tableTitle}
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable
            concatData={concatData}
            data={data}
            tableHeaders={tableHeaders}
            legend={tableTitle}
          />
        </div>
      </div>
    );
  }
}
