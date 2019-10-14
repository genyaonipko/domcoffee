import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PacksSelectors } from '../../../Reducers/PacksReducers';
import ChartPage from '../../../Components/ChartPage';

const useStyles = makeStyles({});

const PacksTabContainer = ({ packs, fetching, concatData, tableData }) => {
  const classes = useStyles();
  const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
  return (
    <ChartPage
      classes={classes}
      chartTitle="График по пачкам"
      tableTitle="Пачки"
      data={packs}
      tableHeaders={tableHeaders}
      isLoading={fetching}
      chartColor="#AB47BC"
      concatData={concatData}
      tableData={tableData}
    />
  )
}

PacksTabContainer.propTypes = {
  packs: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
  concatData: PropTypes.number.isRequired,
  tableData: PropTypes.arrayOf().isRequired,
}

const mSTP = createStructuredSelector({
  packs: PacksSelectors.selectPacksForChart,
  fetching: PacksSelectors.selectPacksFetching,
  concatData: PacksSelectors.concatDataPacks,
  tableData: PacksSelectors.selectPacksForTable,
});

export default connect(
  mSTP,
)(PacksTabContainer);