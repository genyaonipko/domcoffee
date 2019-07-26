import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as PacksSelectors from '../../../Redux/reducers/packsReducers/selectors';
import ChartPage from '../../../Components/ChartPage';

const useStyles = makeStyles({});

const PacksTabContainer = ({ packs, fetching, concatData }) => {
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
    />
  )
}

PacksTabContainer.propTypes = {
  packs: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
  concatData: PropTypes.number.isRequired,
}

const mSTP = createStructuredSelector({
  packs: PacksSelectors.selectPacksForChart,
  fetching: PacksSelectors.selectPacksFetching,
  concatData: PacksSelectors.concatDataPacks,
});

export default connect(
  mSTP,
)(PacksTabContainer);