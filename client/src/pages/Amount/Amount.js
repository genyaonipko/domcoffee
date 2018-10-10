import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import SimpleLineChart from '../../components/Charts/LineChart';
import SimpleTable from '../../components/Table';
import AppBarComponent from '../../components/AppBarComponent';

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
});

class Amount extends React.Component {
  render() {
    const { classes } = this.props;

    const tableHeaders = ['Марка кофе', 'Кол-во вес/кг'];

    const data = {
      balerina: '3',
      orient: '1',
      sera: '0.5',
      barista: '2',
      columbia: '1.3',
    };
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent {...this.props} title="Дашбоард" />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Typography variant="display1" gutterBottom>
              График по учету кофе/вес
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
              <SimpleLineChart data={data} />
            </Typography>
            <Typography variant="display1" gutterBottom>
              Учет кофе/вес
            </Typography>
            <div className={classes.tableContainer}>
              <SimpleTable data={data} tableHeaders={tableHeaders} />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Amount.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Amount);
