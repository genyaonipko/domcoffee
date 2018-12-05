import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import FormDialog from '../../components/FormDialog';

import SimpleLineChart from '../../components/Charts/LineChart';
import SimpleTable from '../../components/Table';
import AppBarComponent from '../../components/AppBarComponent';

import { getAllOwnAction, addOwnAction } from '../../redux/actions/own';

import Loader from '../../components/Loader';

const styles = theme => ({
  root: {
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

class Personal extends Component {
  state = {
    open: false,
  };

  componentDidMount = () => {
    this.props.getAllOwn();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderContent = (data, classes) => {
    const tableHeaders = ['Марка кофе', 'Кол-во вес/кг'];

    return _.findKey(data, o => o !== 0) ? (
      <Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          График по личному употреблению
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart color="#0000CC" legend="Личное" data={data} />
        </Typography>
        <Typography variant="display1" gutterBottom>
          Личное употребление
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
    const { classes, own, isLoading } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Личное употребление" />
          <main className={classes.content}>
            {!isLoading ? this.renderContent(own, classes) : <Loader />}
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
            title="личного употребления"
          />
        </div>
      </Fragment>
    );
  }
}

Personal.propTypes = {
  classes: PropTypes.shape().isRequired,
  getAllOwn: PropTypes.func.isRequired,
  own: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mSTP = state => ({
  own: state.own,
  isLoading: state.settings.isLoading,
});

const mDTP = dispatch => ({
  getAllOwn: () => dispatch(getAllOwnAction()),
  onSubmit: obj => dispatch(addOwnAction(obj)),
});

export default compose(
  withStyles(styles),
  connect(
    mSTP,
    mDTP,
  ),
)(Personal);
