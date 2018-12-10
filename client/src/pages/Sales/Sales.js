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
import { changeDataAction, addSaleAction } from '../../redux/actions/sales';
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
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderContent = (data, classes, isLoading, restProps) => {
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
    const tabTitles = ['Чашки', 'Помол'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={data}
          chartTitle="График по продажам"
          tableTitle="Продажи"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
        />
        <ChartPage
          classes={classes}
          chartTitle="График по продажам"
          tableTitle="Продажи"
          data={data}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
        />
      </TabPages>
    );
  };

  render() {
    const { open } = this.state;
    const { classes, isLoading, data, ...restProps } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Продажи" />
          <main className={classes.content}>
            {this.renderContent(data, classes, isLoading, restProps)}
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
            onSubmit={values => this.props.onSubmit(values)}
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
  data: PropTypes.shape({}).isRequired,
  changeData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mSTP = state => ({
  data: state.sales,
  isLoading: state.settings.isLoading,
});

const mDTP = dispatch => ({
  changeData: () => dispatch(changeDataAction()),
  onSubmit: obj => dispatch(addSaleAction(obj)),
});

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Sales));
