/* eslint-disable */

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
  changeDataOwnpackAction,
  addOwnpackAction,
} from '../../redux/actions/own/ownpacks';
import {
  changeDataOwncupAction,
  addOwncupAction,
} from '../../redux/actions/own/owncups';
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
    this.props.getAllPacks();
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
      this.props.onSubmitPacks(values);
    }
  };

  renderContent = (owncups, ownpacks, classes, isLoading, restProps) => {
    const tableHeaders = ['Марка кофе', 'Кол-во внутреннего'];
    const tabTitles = ['Чашки', 'Пачки'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={owncups}
          chartTitle="График по чашкам"
          tableTitle="Чашки"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#4caf50"
        />
        <ChartPage
          classes={classes}
          chartTitle="График по пачкам"
          tableTitle="Пачки"
          data={ownpacks}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#4caf50"
        />
      </TabPages>
    );
  };

  render() {
    const { open } = this.state;
    const { classes, isLoading, owncups, ownpacks, ...restProps } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Личное" barColor="#4caf50" />
          <main className={classes.content}>
            {this.renderContent(
              owncups,
              ownpacks,
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
  owncups: PropTypes.shape({}).isRequired,
  changeData: PropTypes.func.isRequired,
  getAllPortions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mSTP = state => ({
  owncups: state.owncups,
  ownpacks: state.ownpacks,
  isLoading: state.settings.isLoading,
  tabIndex: state.settings.tabIndex,
});

const mDTP = dispatch => ({
  changeData: () => dispatch(changeDataOwncupAction()),
  getAllPacks: () => dispatch(changeDataOwnpackAction()),
  onSubmit: obj => dispatch(addOwncupAction(obj)),
  onSubmitPacks: obj => dispatch(addOwnpackAction(obj)),
});

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Sales));
