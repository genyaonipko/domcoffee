import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import _ from 'lodash';

import SimpleLineChart from '../../components/Charts/LineChart';
import SimpleTable from '../../components/Table';
import AppBarComponent from '../../components/AppBarComponent';
import FormDialog from '../../components/FormDialog';
import { changeDataAction, addSaleAction } from '../../redux/actions/sales';
// import * as api from '../../utils/api';
import Loader from '../../components/Loader';

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

  renderContent = (data, classes) => {
    const tableHeaders = ['Марка кофе', 'Кол-во продаж'];

    return _.findKey(data, o => o !== 0) ? (
      <Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          График по продажам
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart data={data} legend="Продажи" />
        </Typography>
        <Typography variant="display1" gutterBottom>
          Продажи
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={data} tableHeaders={tableHeaders} />
        </div>
      </Fragment>
    ) : (
      <Typography variant="display1" gutterBottom>
        Нет данных
      </Typography>
    );
  };

  render() {
    const { open } = this.state;
    const { classes, isLoading, data } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Продажи" />
          <main className={classes.content}>
            {!isLoading ? this.renderContent(data, classes) : <Loader />}
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
)(withStyles(styles)(Sales));
