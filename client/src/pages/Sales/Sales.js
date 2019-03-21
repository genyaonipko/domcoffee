import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppBarComponent from '../../components/AppBarComponent';
import FormDialog from '../../components/FormDialog';
import SalesActions from '../../redux/actions/sales';

import {
  selectCoffeeForChart,
  selectPortionsForChart,
  concatDataCoffee,
  concatDataPortions,
} from '../../redux/reducers/sales/selectors';
import {
  additionalSelectors
} from '../../redux/reducers/additionalReducer';

import TabPages from '../../components/TabPage';
import ChartPage from '../../components/ChartPage';

const styles = () => ({
  root: {
    display: 'flex',
    flex: 1,
    width: window.innerWidth - 240,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: 64,
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  button: {
    position: 'fixed',
    right: 16,
    bottom: 16,
  },
});

class Sales extends Component {
  state = {
    open: false,
  };

  componentDidMount = () => {
    this.props.getAllCoffee();
    this.props.getAllPortions();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = values => {
    if (!this.props.tabIndex) {
      this.props.onSubmitCoffee(values);
    } else {
      this.props.onSubmitPortions(values);
    }
  };

  renderFormDialog = () => {
    const { open } = this.state;
    return (
      <FormDialog
        onSubmit={values => this.handleSubmit(values)}
        open={open}
        handleClose={this.handleClose}
        title="продаж"
      />
    );
  };

  renderFabButton = () => {
    const { classes } = this.props;
    return (
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.button}
        onClick={this.handleClickOpen}>
        <AddIcon />
      </Fab>
    );
  };

  renderContent = () => {
    const { portions, coffee, classes, isLoading, ...restProps } = this.props;
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
    const tabTitles = ['Пачки', 'Дегустационная чашка'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={coffee}
          chartTitle="График по пачкам"
          tableTitle="Пачки"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#AB47BC"
          concatData={this.props.concatDataCoffee}
        />
        <ChartPage
          classes={classes}
          chartTitle="График по дегустационным чашкам"
          tableTitle="Дегустационные чашки"
          data={portions}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#AB47BC"
          concatData={this.props.concatDataPortions}
        />
      </TabPages>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Пачки" barColor="#AB47BC" />
          <main className={classes.content}>{this.renderContent()}</main>
          {this.renderFabButton()}
          {this.renderFormDialog()}
        </div>
      </Fragment>
    );
  }
}

Sales.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,

  // data
  portions: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  coffee: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  concatDataCoffee: PropTypes.number.isRequired,
  concatDataPortions: PropTypes.number.isRequired,

  // function
  getAllCoffee: PropTypes.func.isRequired,
  getAllPortions: PropTypes.func.isRequired,
  onSubmitCoffee: PropTypes.func.isRequired,
  onSubmitPortions: PropTypes.func.isRequired,
};

const mSTP = createStructuredSelector({
  portions: selectPortionsForChart,
  coffee: selectCoffeeForChart,
  isLoading: additionalSelectors.selectLoader,
  tabIndex: additionalSelectors.selectTabIndex,
  concatDataCoffee,
  concatDataPortions,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllCoffee: SalesActions.changeDataCoffeeAction,
      getAllPortions: SalesActions.changeDataPortionAction,
      onSubmitCoffee: SalesActions.addPackAction,
      onSubmitPortions: SalesActions.addPortionAction,
    },
    dispatch,
  );

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Sales));
