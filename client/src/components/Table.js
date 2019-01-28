import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: 60,
  },
  table: {
    minWidth: 700,
  },
  tableHeader: {
    width: '50%',
  },
};

function SimpleTable(props) {
  const { classes, tableHeaders, data } = props;

  const concatData = Object.values(data).reduce(
    (previousValue, currentItem) => previousValue + currentItem,
    0,
  );
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {tableHeaders &&
              tableHeaders.map(header => (
                <TableCell key={`item_${header}`}>{header}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map(n => (
            <TableRow key={`item_th_${n}`}>
              <TableCell component="th" scope="row">
                {n}
              </TableCell>
              <TableCell>{data[n]}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              style={{ fontWeight: 900, fontSize: 18 }}
              component="th"
              scope="row">
              Итого
            </TableCell>
            <TableCell style={{ fontWeight: 900, fontSize: 18 }}>
              {concatData}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SimpleTable);
