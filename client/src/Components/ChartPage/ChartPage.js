/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import Typography from '@material-ui/core/Typography';
import LineChartIcon from '@material-ui/icons/ShowChart';
import { makeStyles } from '@material-ui/core/styles';
import PieChartIcon from '@material-ui/icons/PieChart';
import { PieChart, LineChart } from '../Charts';
import Loader from '../Loader';
import GridItem from '../../NewComponents/Grid/GridItem';
import GridContainer from '../../NewComponents/Grid/GridContainer';
// import Danger from '../../NewComponents/Typography/Danger';
import Card from '../../NewComponents/Card/Card';
import CardHeader from '../../NewComponents/Card/CardHeader';
import CardIcon from '../../NewComponents/Card/CardIcon';
import CardBody from '../../NewComponents/Card/CardBody';
import CardFooter from '../../NewComponents/Card/CardFooter';
import moment from 'moment';
import Table from '../../NewComponents/Table/Table';
import {
  warningColor,
  successColor,
} from '../../assets/jss/material-dashboard-react';
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const ChartPage = ({
  data,
  tableHeaders,
  chartTitle,
  tableTitle,
  isLoading,
  tableData,
  concatData,
}) => {
  console.log(tableData);
  const classes = useStyles();
  if (isLoading) return <Loader />;
  if (isEmpty(data)) {
    return <Title />;
  }
  return (
    <div style={{ marginLeft: 24, marginRight: 24 }}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning" icon>
              <CardIcon color="warning" icon>
                <LineChartIcon />
              </CardIcon>
            </CardHeader>
            <CardBody>
              <LineChart
                data={data}
                legend={tableTitle}
                height={500}
                tooltipTextColor="#ffffff"
                color={warningColor[0]}
                type="warning"
              />
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <p style={{ marginLeft: 24, fontSize: 24, fontWeight: 900 }}>
                  {chartTitle}
                </p>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success" icon>
              <CardIcon color="success" icon>
                <PieChartIcon />
              </CardIcon>
            </CardHeader>
            <CardBody>
              <PieChart data={data} legend="Пачки" color={successColor[0]} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Персонал</h4>
              <p className={classes.cardCategoryWhite}>
                на дату {moment().format('Do MMMM YYYY')}
              </p>
            </CardHeader>
            <CardBody>
              {tableData ? (
                <Table
                  tableHeaderColor="warning"
                  tableHead={tableHeaders}
                  tableData={tableData}
                />
              ) : (
                <div className={classes.stats}>
                  <p style={{ marginLeft: 24, fontSize: 24, fontWeight: 900 }}>
                    Нет данных
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const Title = () => (
  <div style={{ margin: 24 }}>
    <Typography variant="h2" gutterBottom>
      Нет данных
    </Typography>
  </div>
);

ChartPage.propTypes = {
  classes: PropTypes.shape({
    appBarSpacer: PropTypes.shape({}).isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  chartTitle: PropTypes.string.isRequired,
  tableTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  chartColor: PropTypes.string.isRequired,
  concatData: PropTypes.number.isRequired,
};

export default ChartPage;
