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
  changeDataInnerpackAction,
  addInnerpackAction,
} from '../../redux/actions/inner/innerpacks';
import {
  changeDataInnercupAction,
  addInnercupAction,
} from '../../redux/actions/inner/innercups';
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

  renderContent = (innercups, innerpacks, classes, isLoading, restProps) => {
    const tableHeaders = ['Марка кофе', 'Кол-во внутреннего'];
    const tabTitles = ['Чашки', 'Пачки'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={innercups}
          chartTitle="График по чашкам"
          tableTitle="Чашки"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#26A69A"
        />
        <ChartPage
          classes={classes}
          chartTitle="График по пачкам"
          tableTitle="Пачки"
          data={innerpacks}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#26A69A"
        />
      </TabPages>
    );
  };

  render() {
    const { open } = this.state;
    const {
      classes,
      isLoading,
      innercups,
      innerpacks,
      ...restProps
    } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Внутреннее" barColor="#26A69A" />
          <main className={classes.content}>
            {this.renderContent(
              innercups,
              innerpacks,
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
  innercups: PropTypes.shape({}).isRequired,
  changeData: PropTypes.func.isRequired,
  getAllPortions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mSTP = state => ({
  innercups: state.innercups,
  innerpacks: state.innerpacks,
  isLoading: state.settings.isLoading,
  tabIndex: state.settings.tabIndex,
});

const mDTP = dispatch => ({
  changeData: () => dispatch(changeDataInnercupAction()),
  getAllPacks: () => dispatch(changeDataInnerpackAction()),
  onSubmit: obj => dispatch(addInnercupAction(obj)),
  onSubmitPacks: obj => dispatch(addInnerpackAction(obj)),
});

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Sales));
