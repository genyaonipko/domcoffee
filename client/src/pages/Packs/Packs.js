// /* eslint-disable */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddIcon from '@material-ui/icons/Add';

import AppBarComponent from '../../components/AppBarComponent';
import FormDialog from '../../components/FormDialog';
import {
  changeDataDegustationAction,
  addDegustationAction,
} from '../../redux/actions/packs/degustation';
import {
  changeDataPacksAction,
  addPackAction,
} from '../../redux/actions/packs/packs';
// import * as api from '../../utils/api';
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
    this.props.changeData();
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
      this.props.onSubmit(values);
    } else {
      this.props.onSubmitDegustation(values);
    }
  };

  renderContent = (degustation, packs, classes, isLoading, restProps) => {
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
        />
        <ChartPage
          classes={classes}
          chartTitle="График по дегустационным чашкам"
          tableTitle="Дегустационная чашки"
          data={degustation}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
        />
      </TabPages>
    );
  };

  render() {
    const { open } = this.state;
    const { classes, isLoading, degustation, packs, ...restProps } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Пачки" barColor="#AB47BC" />
          <main className={classes.content}>
            {this.renderContent(
              degustation,
              packs,
              classes,
              isLoading,
              restProps,
            )}
          </main>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.button}
            onClick={this.handleClickOpen}>
            <AddIcon />
          </Button>
          <FormDialog
            onSubmit={values => this.handleSubmit(values)}
            open={open}
            handleClose={this.handleClose}
            title="продаж"
          />
        </div>
      </Fragment>
    );
  }
}

Sales.propTypes = {
  classes: PropTypes.shape().isRequired,
  degustation: PropTypes.shape({}).isRequired,
  changeData: PropTypes.func.isRequired,
  getAllPortions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mSTP = state => ({
  degustation: state.degustation,
  packs: state.packs,
  isLoading: state.settings.isLoading,
  tabIndex: state.settings.tabIndex,
});

const mDTP = dispatch => ({
  changeData: () => dispatch(changeDataPacksAction()),
  getAllDegustation: () => dispatch(changeDataDegustationAction()),
  onSubmit: obj => dispatch(addPackAction(obj)),
  onSubmitDegustation: obj => dispatch(addDegustationAction(obj)),
});

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Sales));
