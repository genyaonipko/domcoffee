import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as SalesSelectors from '../../../Redux/reducers/salesReducers/selectors';
import ChartPage from '../../../Components/ChartPage';

const useStyles = makeStyles({});

const PortionTabContainer = ({ portion, fetching, concatData }) => {
  const classes = useStyles();
  const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
  return (
    <ChartPage
      classes={classes}
      chartTitle="График по порциям"
      tableTitle="Порции"
      data={portion}
      tableHeaders={tableHeaders}
      isLoading={fetching}
      chartColor="#aa2c11"
      concatData={concatData}
    />
  )
}

PortionTabContainer.propTypes = {
  portion: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
  concatData: PropTypes.number.isRequired,
}

const mSTP = createStructuredSelector({
  portion: SalesSelectors.selectPortionForChart,
  fetching: SalesSelectors.selectPortionFetching,
  concatData: SalesSelectors.concatDataPortion,
});

export default connect(
  mSTP,
)(PortionTabContainer);