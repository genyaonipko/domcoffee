import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as PacksSelectors from '../../../Redux/reducers/packsReducers/selectors';
import ChartPage from '../../../Components/ChartPage';

const useStyles = makeStyles({});

const DegustationTabContainer = ({ degustation, fetching, concatData }) => {
  const classes = useStyles();
  const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
  return (
    <ChartPage
      classes={classes}
      data={degustation}
      chartTitle="График по дегустационным чашкам"
      tableTitle="Дегустационные чашки"
      tableHeaders={tableHeaders}
      isLoading={fetching}
      chartColor="#AB47BC"
      concatData={concatData}
    />
  )
}

DegustationTabContainer.propTypes = {
  degustation: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
  concatData: PropTypes.number.isRequired,
}

const mSTP = createStructuredSelector({
  degustation: PacksSelectors.selectDegustationForChart,
  fetching: PacksSelectors.selectDegustationFetching,
  concatData: PacksSelectors.concatDataDegustation,
});

export default connect(
  mSTP,
)(DegustationTabContainer);