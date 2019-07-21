import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import Typography from '@material-ui/core/Typography';
import { PieChart, LineChart } from '../Charts';
import SimpleTable from '../Table';
import Loader from '../Loader';

const ChartPage = ({
  classes,
  data,
  tableHeaders,
  chartTitle,
  tableTitle,
  isLoading,
  chartColor,
  concatData,
}) => {
  if (isLoading) return <Loader />;
  if (isEmpty(data)) {
    return <Title />;
  }
  return (
    <div style={{ margin: 24 }}>
      <div className={classes.appBarSpacer} />
      <Typography variant="h4" gutterBottom>
        {chartTitle}
      </Typography>
      <Typography
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        component="div">
        <div
          style={{
            flexDirection: 'column',
            width: '99%',
            display: 'flex',
            alignItems: 'center',
          }}>
          <LineChart color={chartColor} data={data} legend={tableTitle} />
          <PieChart color={chartColor} data={data} legend={tableTitle} />
        </div>
      </Typography>
      <Typography variant="h4" gutterBottom>
        {tableTitle}
      </Typography>
      <SimpleTable
        concatData={concatData}
        data={data}
        tableHeaders={tableHeaders}
        legend={tableTitle}
      />
    </div>
  );
};

const Title = () => (
  <div style={{ margin: 24 }}>
    <Typography variant="h2" gutterBottom>
      Нет данных
    </Typography>
  </div>
);

ChartPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  chartTitle: PropTypes.string.isRequired,
  tableTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  chartColor: PropTypes.string.isRequired,
  concatData: PropTypes.number.isRequired,
};

export default ChartPage;
