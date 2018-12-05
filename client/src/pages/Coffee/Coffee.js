import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import _ from 'lodash';

import {
  getAllCoffeeAction,
  addCoffeeAction,
} from '../../redux/actions/coffee';

import Loader from '../../components/Loader';

import SimpleLineChart from '../../components/Charts/LineChart';
import SimpleTable from '../../components/Table';
import AppBarComponent from '../../components/AppBarComponent';
import FormDialog from '../../components/FormDialog';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    width: window.innerWidth - 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    paddingTop: 88,
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

class Coffee extends Component {
  state = {
    open: false,
    data: []
  };

  componentDidMount = () => {
    this.props.getAllCoffee();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderContent = (coffee, classes) => {
    const tableHeaders = ['Марка кофе', 'Кол-во вес/кг'];

    return _.findKey(coffee, o => o !== 0) ? (
      <Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          График по помолу
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart color="#009900" data={coffee} legend="Помол" />
        </Typography>
        <Typography variant="display1" gutterBottom>
          Помол
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={coffee} tableHeaders={tableHeaders} />
        </div>
      </Fragment>
    ) : (
      <Typography variant="display1" gutterBottom>
        Нет данных
      </Typography>
    );
  };

  render() {
    const { classes, coffee, isLoading } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Помол" />
          <main className={classes.content}>
            {!isLoading ? this.renderContent(coffee, classes) : <Loader />}
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
            title="помола"
          />
        </div>
      </Fragment>
    );
  }
}

Coffee.propTypes = {
  classes: PropTypes.shape().isRequired,
  getAllCoffee: PropTypes.func.isRequired,
  coffee: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mSTP = state => ({
  coffee: state.coffee,
  isLoading: state.settings.isLoading,
});

const mDTP = dispatch => ({
  getAllCoffee: () => dispatch(getAllCoffeeAction()),
  onSubmit: obj => dispatch(addCoffeeAction(obj)),
});

export default compose(
  withStyles(styles),
  connect(
    mSTP,
    mDTP,
  ),
)(Coffee);
