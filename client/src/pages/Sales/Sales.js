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
  getAllCoffeeAction,
  addCoffeeAction,
} from '../../redux/actions/sales/coffee';
import {
  changePortionsAction,
  addPortionsAction,
} from '../../redux/actions/sales/portions';
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
      this.props.onSubmitPortions(values);
    } else {
      this.props.onSubmit(values);
    }
  };

  renderContent = (coffee, portions, classes, isLoading, restProps) => {
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];
    const tabTitles = ['Чашки', 'Помол'];

    return (
      <TabPages tabTitles={tabTitles} classes={classes} {...restProps}>
        <ChartPage
          classes={classes}
          data={portions}
          chartTitle="График по чашкам"
          tableTitle="Чашки"
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#ab003c"
        />
        <ChartPage
          classes={classes}
          chartTitle="График по помолу"
          tableTitle="Помол"
          data={coffee}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          chartColor="#ab003c"
        />
      </TabPages>
    );
  };

  render() {
    const { open } = this.state;
    const { classes, isLoading, coffee, portions, ...restProps } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Продажи" barColor="#ab003c" />
          <main className={classes.content}>
            {this.renderContent(
              coffee,
              portions,
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
  // settings
  classes: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,

  // data
  coffee: PropTypes.shape({}).isRequired,
  portions: PropTypes.shape({}).isRequired,

  // function
  changeData: PropTypes.func.isRequired,
  getAllPortions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitPortions: PropTypes.func.isRequired,
};

const mSTP = state => ({
  coffee: state.coffee,
  portions: state.portions,
  isLoading: state.settings.isLoading,
  tabIndex: state.settings.tabIndex,
});

const mDTP = dispatch => ({
  changeData: () => dispatch(getAllCoffeeAction()),
  getAllPortions: () => dispatch(changePortionsAction()),
  onSubmit: obj => dispatch(addCoffeeAction(obj)),
  onSubmitPortions: obj => dispatch(addPortionsAction(obj)),
});

export default connect(
  mSTP,
  mDTP,
)(withStyles(styles, { withTheme: true })(Sales));
