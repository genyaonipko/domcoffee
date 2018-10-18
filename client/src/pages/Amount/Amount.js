import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SimpleLineChart from '../../components/Charts/LineChart';
import SimpleTable from '../../components/Table';
import AppBarComponent from '../../components/AppBarComponent';
import Loader from '../../components/Loader';

import {
  changePortionsAction,
  addPortionsAction,
} from '../../redux/actions/portions';
import FormDialog from '../../components/FormDialog';

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

class Amount extends React.Component {
  state = {
    open: false,
    data: [],
  };

  componentDidMount = () => {
    this.props.getAllPortions();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderContent = (portions, classes) => {
    const tableHeaders = ['Марка кофе', 'Кол-во порций'];

    return _.findKey(portions, o => o !== 0) ? (
      <Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom>
          График по порциям
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart data={portions} legend="Порции" />
        </Typography>
        <Typography variant="display1" gutterBottom>
          Порции
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={portions} tableHeaders={tableHeaders} />
        </div>
      </Fragment>
    ) : (
      <Typography variant="display1" gutterBottom>
        Нет данных
      </Typography>
    );
  };

  render() {
    const { classes, portions, isLoading } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Дашбоард" />
          <main className={classes.content}>
            {!isLoading ? this.renderContent(portions, classes) : <Loader />}
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
      </React.Fragment>
    );
  }
}

Amount.propTypes = {
  classes: PropTypes.shape().isRequired,
  getAllPortions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  portions: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mSTP = state => ({
  portions: state.portions,
  isLoading: state.settings.isLoading,
});

const mDTP = dispatch => ({
  getAllPortions: () => dispatch(changePortionsAction()),
  onSubmit: obj => dispatch(addPortionsAction(obj)),
});

export default compose(
  withStyles(styles),
  connect(
    mSTP,
    mDTP,
  ),
)(Amount);
