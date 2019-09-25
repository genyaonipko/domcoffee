import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as CoffeeSelectors from '../../../Redux/reducers/salesReducers/selectors';
import ChartPage from '../../../Components/ChartPage';

const useStyles = makeStyles({});

const CoffeeTabContainer = ({ coffee, fetching, concatData, tableData }) => {
  const classes = useStyles();
  const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
  return (
    <ChartPage
      classes={classes}
      chartTitle="График по пачкам"
      tableTitle="Пачки"
      data={coffee}
      tableHeaders={tableHeaders}
      isLoading={fetching}
      chartColor="#AB47BC"
      concatData={concatData}
      tableData={tableData}
    />
  )
}

CoffeeTabContainer.propTypes = {
  coffee: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
  concatData: PropTypes.number.isRequired,
  tableData: PropTypes.arrayOf().isRequired,
}

const mSTP = createStructuredSelector({
  coffee: CoffeeSelectors.selectCoffeeForChart,
  fetching: CoffeeSelectors.selectCoffeeFetching,
  concatData: CoffeeSelectors.concatDataCoffee,
  tableData: CoffeeSelectors.selectCoffeeForTable,
});

export default connect(
  mSTP,
)(CoffeeTabContainer);