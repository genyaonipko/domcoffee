import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as SalesSelectors from '../../../Redux/reducers/sales/selectors';
import ChartPage from '../../../Components/ChartPage';

const useStyles = makeStyles({});

const CoffeeTabContainer = ({ coffee, fetching, concatData }) => {
  const classes = useStyles();
  const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
  return (
    <ChartPage
      classes={classes}
      data={coffee}
      chartTitle="График по помолу"
      tableTitle="Помол"
      tableHeaders={tableHeaders}
      isLoading={fetching}
      chartColor="#aa2c11"
      concatData={concatData}
    />
  )
}

CoffeeTabContainer.propTypes = {
  coffee: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
  concatData: PropTypes.number.isRequired,
}

const mSTP = createStructuredSelector({
  coffee: SalesSelectors.selectCoffeeForChart,
  fetching: SalesSelectors.selectCoffeeFetching,
  concatData: SalesSelectors.concatDataCoffee,
});

export default connect(
  mSTP,
)(CoffeeTabContainer);