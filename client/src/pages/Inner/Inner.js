import React, { PureComponent, Fragment } from 'react';
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
import InnerActions from '../../redux/actions/inner';
import {
  selectInnerpacksForChart,
  selectInnercupsForChart,
  concatDataInnerpacks,
  concatDataInnercups,
} from '../../redux/reducers/inner/selectors';
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

class Inner extends PureComponent {
  state = {
    open: false,
  };

  componentDidMount = () => {
    this.props.getAllInnerpacks();
    this.props.getAllInnercups();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = values => {
    if (!this.props.tabIndex) {
      this.props.onSubmitInnerpacks(values);
    } else {
      this.props.onSubmitInnercups(values);
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
        color="secondary"
        aria-label="Add"
        className={classes.button}
        onClick={this.handleClickOpen}>
        <AddIcon />
      </Fab>
    );
  };

  renderContent = () => {
    const { innercups, innerpacks, classes, isLoading, ...restProps } = this.props;
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
    const tabTitles = ['Пачки', 'Чашки'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={innerpacks}
          chartTitle="График по пачкам"
          tableTitle="Пачки"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#26A69A"
          concatData={this.props.concatDataInnerpacks}
        />
        <ChartPage
          classes={classes}
          chartTitle="График по чашкам"
          tableTitle="Чашки"
          data={innercups}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#26A69A"
          concatData={this.props.concatDataInnercups}
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
          <AppBarComponent title="Внутренее" />
          <main className={classes.content}>{this.renderContent()}</main>
          {this.renderFabButton()}
          {this.renderFormDialog()}
          <SnackBar
            visible={!!errors.inner}
            type="error"
            message={errors.inner}
          />
        </div>
      </Fragment>
    );
  }
}

Inner.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
  errors: PropTypes.shape({}).isRequired,

  // data
  innercups: PropTypes.shape({}).isRequired,
  innerpacks: PropTypes.shape({}).isRequired,
  concatDataInnerpacks: PropTypes.number.isRequired,
  concatDataInnercups: PropTypes.number.isRequired,

  // function
  getAllInnercups: PropTypes.func.isRequired,
  getAllInnerpacks: PropTypes.func.isRequired,
  onSubmitInnerpacks: PropTypes.func.isRequired,
  onSubmitInnercups: PropTypes.func.isRequired,
};

const mSTP = createStructuredSelector({
  innercups: selectInnercupsForChart,
  innerpacks: selectInnerpacksForChart,
  isLoading: additionalSelectors.selectLoader,
  tabIndex: additionalSelectors.selectTabIndex,
  concatDataInnerpacks,
  concatDataInnercups,
  errors: additionalSelectors.selectErrors,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllInnerpacks: InnerActions.changeDataInnerpackAction,
      getAllInnercups: InnerActions.changeDataInnercupAction,
      onSubmitInnerpacks: InnerActions.addInnerpackAction,
      onSubmitInnercups: InnerActions.addInnercupAction,
    },
    dispatch,
  );

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Inner));
