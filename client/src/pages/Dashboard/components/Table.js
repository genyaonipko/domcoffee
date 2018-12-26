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

  const initialData = [
    { name: 'balerina' },
    { name: 'gourme' },
    { name: 'orient' },
    { name: 'servus' },
    { name: 'sera' },
    { name: 'rose' },
    { name: 'opera' },
    { name: 'barista' },
    { name: 'nero' },
    { name: 'italia' },
    { name: 'marone' },
    { name: 'pura' },
    { name: 'verde' },
    { name: 'cote' },
    { name: 'trope' },
    { name: 'java' },
    { name: 'efiopia' },
    { name: 'columbia' },
    { name: 'crema' },
  ];
  const dataMain = initialData.map(item => ({
    ...item,
    // Продажи: data.sales[item.name],
    Помол: data.coffee[item.name],
    Личное: data.own[item.name],
    Порции: data.portions[item.name],
  }));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {tableHeaders &&
              tableHeaders.map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataMain.map(n => (
            <TableRow key={`table_item_${n.name}`}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell>{n.Продажи}</TableCell>
              <TableCell>{n.Помол}</TableCell>
              <TableCell>{n.Личное}</TableCell>
              <TableCell>{n.Порции}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              style={{ fontWeight: 900, fontSize: 18 }}
              component="th"
              scope="row">
              Итого
            </TableCell>
            {Object.keys(data).map(item => {
              const summ = Object.values(data[item]).reduce(
                (previousValue, currentItem) => previousValue + currentItem,
                0,
              );
              return (
                <TableCell
                  key={`table_summ_${item}`}
                  style={{ fontWeight: 900, fontSize: 18 }}>
                  {summ}
                </TableCell>
              );
            })}
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
