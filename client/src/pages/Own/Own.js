import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddIcon from '@material-ui/icons/Add';

import AppBarComponent from '../../components/AppBarComponent';
import FormDialog from '../../components/FormDialog';
import OwnActions from '../../redux/actions/own';
import {
  selectOwnpacksForChart,
  selectOwncupsForChart,
  concatDataOwnpacks,
  concatDataOwncups,
} from '../../redux/reducers/own/selectors';
import {
  additionalSelectors
} from '../../redux/reducers/additionalReducer';
import TabPages from '../../components/TabPage';
import ChartPage from '../../components/ChartPage';
import SnackBar from '../../components/SnackBar';

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

class Own extends Component {
  state = {
    open: false,
  };

  componentDidMount = () => {
    this.props.getAllOwnpacks();
    this.props.getAllOwncups();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = values => {
    if (!this.props.tabIndex) {
      this.props.onSubmitOwnpacks(values);
    } else {
      this.props.onSubmitOwncups(values);
    }
  };

  renderFormDialog = () => {
    const { open } = this.state;
    return (
      <FormDialog
        onSubmit={values => this.handleSubmit(values)}
        open={open}
        handleClose={this.handleClose}
        title="личного"
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
    const { owncups, ownpacks, classes, isLoading, ...restProps } = this.props;
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
    const tabTitles = ['Пачки', 'Чашки'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={ownpacks}
          chartTitle="График по пачкам"
          tableTitle="Пачки"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#4caf50"
          concatData={this.props.concatDataOwnpacks}
        />
        <ChartPage
          classes={classes}
          chartTitle="График по чашкам"
          tableTitle="Чашки"
          data={owncups}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#4caf50"
          concatData={this.props.concatDataOwncups}
        />
      </TabPages>
    );
  };

  render() {
    const { classes, errors } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Личное" barColor="#4caf50" />
          <main className={classes.content}>{this.renderContent()}</main>
          {this.renderFabButton()}
          {this.renderFormDialog()}
          <SnackBar
            visible={!!errors.own}
            type="error"
            message={errors.own}
          />
        </div>
      </Fragment>
    );
  }
}

Own.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
  errors: PropTypes.shape({}).isRequired,

  // data
  owncups: PropTypes.shape({}).isRequired,
  ownpacks: PropTypes.shape({}).isRequired,
  concatDataOwnpacks: PropTypes.number.isRequired,
  concatDataOwncups: PropTypes.number.isRequired,

  // function
  getAllOwncups: PropTypes.func.isRequired,
  getAllOwnpacks: PropTypes.func.isRequired,
  onSubmitOwnpacks: PropTypes.func.isRequired,
  onSubmitOwncups: PropTypes.func.isRequired,
};

const mSTP = createStructuredSelector({
  owncups: selectOwncupsForChart,
  ownpacks: selectOwnpacksForChart,
  isLoading: additionalSelectors.selectLoader,
  tabIndex: additionalSelectors.selectTabIndex,
  concatDataOwnpacks,
  concatDataOwncups,
  errors: additionalSelectors.selectErrors,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllOwnpacks: OwnActions.changeDataOwnpackAction,
      getAllOwncups: OwnActions.changeDataOwncupAction,
      onSubmitOwnpacks: OwnActions.addOwnpackAction,
      onSubmitOwncups: OwnActions.addOwncupAction,
    },
    dispatch,
  );

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Own));
