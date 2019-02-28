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
import PacksActions from '../../redux/actions/packs';

import {
  selectPacksForChart,
  selectDegustationForChart,
  concatDataPacks,
  concatDataDegustation,
} from '../../redux/reducers/packs/selectors';
import {
  selectTabIndex,
  selectLoader,
} from '../../redux/reducers/settingsSelector';

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

class Packs extends Component {
  state = {
    open: false,
  };

  componentDidMount = () => {
    this.props.getAllPacks();
    this.props.getAllDegustation();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = values => {
    if (!this.props.tabIndex) {
      this.props.onSubmitPacks(values);
    } else {
      this.props.onSubmitDegustation(values);
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
    const { degustation, packs, classes, isLoading, ...restProps } = this.props;
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
    const tabTitles = ['Пачки', 'Дегустационная чашка'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={packs}
          chartTitle="График по пачкам"
          tableTitle="Пачки"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#AB47BC"
          concatData={this.props.concatDataPacks}
        />
        <ChartPage
          classes={classes}
          chartTitle="График по дегустационным чашкам"
          tableTitle="Дегустационные чашки"
          data={degustation}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#AB47BC"
          concatData={this.props.concatDataDegustation}
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

Packs.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,

  // data
  degustation: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  packs: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  concatDataPacks: PropTypes.number.isRequired,
  concatDataDegustation: PropTypes.number.isRequired,

  // function
  getAllPacks: PropTypes.func.isRequired,
  getAllDegustation: PropTypes.func.isRequired,
  onSubmitPacks: PropTypes.func.isRequired,
  onSubmitDegustation: PropTypes.func.isRequired,
};

const mSTP = createStructuredSelector({
  degustation: selectDegustationForChart,
  packs: selectPacksForChart,
  isLoading: selectLoader,
  tabIndex: selectTabIndex,
  concatDataPacks,
  concatDataDegustation,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllPacks: PacksActions.changeDataPacksAction,
      getAllDegustation: PacksActions.changeDataDegustationAction,
      onSubmitPacks: PacksActions.addPackAction,
      onSubmitDegustation: PacksActions.addDegustationAction,
    },
    dispatch,
  );

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Packs));
