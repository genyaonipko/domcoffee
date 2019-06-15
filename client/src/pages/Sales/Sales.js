import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppBarComponent from '../../Components/AppBarComponent';
import FormDialog from '../../Components/FormDialog';
import SalesActions from '../../Redux/actions/sales';
import SnackBar from '../../Components/SnackBar';

import * as SalesSelectors from '../../Redux/reducers/sales/selectors';
import {
  additionalSelectors
} from '../../Redux/reducers/additionalReducer';

import CoffeeTabContainer from './Components/CoffeeTabContainer';
import TabPages from '../../Components/TabPage';
import ChartPage from '../../Components/ChartPage';

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
  button: {
    position: 'fixed',
    right: 16,
    bottom: 16,
  },
});

class Sales extends PureComponent {
  state = {
    open: false,
  };

  componentDidMount = () => {
    this.props.getCoffee();
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
        color="secondary"
        aria-label="Add"
        className={classes.button}
        onClick={this.handleClickOpen}>
        <AddIcon />
      </Fab>
    );
  };

  renderContent = () => {
    const { portions, classes, ...restProps } = this.props;
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
    const tabTitles = ['Помол', 'Порции'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <CoffeeTabContainer />
        <ChartPage
          classes={classes}
          chartTitle="График по порциям"
          tableTitle="Порции"
          data={portions}
          tableHeaders={tableHeaders}
          isLoading={false}
          chartColor="#aa2c11"
          concatData={this.props.concatDataPortions}
        />
      </TabPages>
    );
  };

  render() {
    const { classes, errorsCoffee } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Продажи" />
          <main className={classes.content}>{this.renderContent()}</main>
          {this.renderFabButton()}
          {this.renderFormDialog()}
          <SnackBar
            visible={!!errorsCoffee}
            type="error"
            message={errorsCoffee}
          />
        </div>
      </Fragment>
    );
  }
}

Sales.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  tabIndex: PropTypes.number.isRequired,
  errorsCoffee: PropTypes.string.isRequired,

  // data
  portions: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  concatDataPortions: PropTypes.number.isRequired,

  // function
  getCoffee: PropTypes.func.isRequired,
  getAllPortions: PropTypes.func.isRequired,
  onSubmitCoffee: PropTypes.func.isRequired,
  onSubmitPortions: PropTypes.func.isRequired,
};

const mSTP = createStructuredSelector({
  portions: SalesSelectors.selectPortionsForChart,
  tabIndex: additionalSelectors.selectTabIndex,
  concatDataPortions: SalesSelectors.concatDataPortions,
  errorsCoffee: SalesSelectors.selectCoffeeError,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getCoffee: SalesActions.getCoffeeAction,
      getAllPortions: SalesActions.changeDataPortionAction,
      onSubmitCoffee: SalesActions.addCoffeeAction,
      onSubmitPortions: SalesActions.addPortionAction,
    },
    dispatch,
  );

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Sales));
