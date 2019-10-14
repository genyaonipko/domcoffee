import React from 'react';
import PropTypes from 'prop-types';
// react plugin for creating charts
// import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
// import Icon from '@material-ui/core/Icon';
// @material-ui/icons
// import Warning from '@material-ui/icons/Warning';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
// import DateRange from '@material-ui/icons/DateRange';
// import LocalOffer from '@material-ui/icons/LocalOffer';
// import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Accessibility from '@material-ui/icons/Accessibility';
import BarChartIcon from '@material-ui/icons/BarChart';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import moment from 'moment';
// core components

import GridItem from '../../NewComponents/Grid/GridItem';
import Loader from '../../Components/Loader';
import GridContainer from '../../NewComponents/Grid/GridContainer';
import Table from '../../NewComponents/Table/Table';
// import Danger from '../../NewComponents/Typography/Danger';
import Card from '../../NewComponents/Card/Card';
import CardHeader from '../../NewComponents/Card/CardHeader';
import CardIcon from '../../NewComponents/Card/CardIcon';
import CardBody from '../../NewComponents/Card/CardBody';
import CardFooter from '../../NewComponents/Card/CardFooter';

import AppBarComponent from '../../Components/AppBarComponent';

import { PacksActions, PacksSelectors } from '../../Reducers/PacksReducers';
import { CoffeeActions, CoffeeSelectors } from '../../Reducers/CoffeeReducers';
import {
  PortionsActions,
  PortionsSelectors,
} from '../../Reducers/PortionsReducers';
import { LineChart } from '../../Components/Charts';

// import {
//   selectDashboardTab1,
//   selectDashboardTab2,
// } from '../../Redux/reducers/dashboardReducer/selectors';
import { CommonSelectors } from '../../Reducers/CommonReducers';
import { selectUsersForDashboard } from '../../Reducers/reducers/usersReducer/selectors';
import UsersAction from '../../Reducers/actions/users/user';

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle';
import {
  warningColor,
  successColor,
} from '../../assets/jss/material-dashboard-react';

const useStyles = makeStyles(styles);

const APP_BAR_TITLE = 'Дашборд';

const Dashboard = props => {
  const classes = useStyles();

  React.useEffect(() => {
    props.changeData();
    props.getUsers();
    props.getAllCoffee();
    props.getAllPortions();
  }, []);

  // eslint-disable-next-line
  const renderDate = props.dateFilter && props.dateFilter._d;
  return (
    <div style={{ paddingTop: 112, width: '100%' }}>
      <AppBarComponent title={APP_BAR_TITLE} />
      {!props.fetchingPortions || !props.fetchingCoffee || !props.fetchingPacks ? (
        <>
          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <ShoppingCartIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Всего пачек</p>
                  <h3 className={classes.cardTitle}>
                    {props.concatPacks} <small>шт</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <p style={{ margin: 0 }}>
                      {moment().format('D MMMM YYYY')}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <CoffeeIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Всего помол</p>
                  <h3 className={classes.cardTitle}>
                    {props.concatCoffee} <small>шт</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <p style={{ margin: 0 }}>
                      {moment().format('D MMMM YYYY')}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <BarChartIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Всего порций</p>
                  <h3 className={classes.cardTitle}>
                    {props.concatPortion} <small>шт</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <p style={{ margin: 0 }}>
                      {moment().format('D MMMM YYYY')}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                {props.hasExistPacks ? (
                  <>
                    <CardHeader color="success">
                      <LineChart
                        data={props.packsForChart}
                        legend="Пачки"
                        height={225}
                        color="#ffffff"
                        type="success"
                        tooltipTextColor="#ffffff"
                      />
                    </CardHeader>
                    {props.dailyPacksIncrease ? (
                      <CardBody>
                        <h4 className={classes.cardTitle}>
                          Дневные продажи пачек
                        </h4>
                        <p className={classes.cardCategory}>
                          <span
                            className={
                              props.dailyPacksIncrease > 0
                                ? classes.successText
                                : classes.dangerText
                            }>
                            {props.dailyPacksIncrease > 0 ? (
                              <ArrowUpward
                                className={classes.upArrowCardCategory}
                              />
                            ) : (
                              <ArrowDownward
                                className={classes.upArrowCardCategory}
                              />
                            )}
                            {props.dailyPacksIncrease}%
                          </span>
                          {props.dailyPacksIncrease > 0
                            ? 'повышение'
                            : 'снижение'}{' '}
                          продаж сегодня.
                        </p>
                      </CardBody>
                    ) : null}
                    <CardFooter chart>
                      <div className={classes.stats}>
                        {props.dailyPacksIncrease
                          ? moment(renderDate).format('D MMMM YYYY')
                          : ' Все время'}
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  <h1 style={{ margin: 20 }} className={classes.cardTitle}>
                    Нет Данных про пачки
                  </h1>
                )}
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                {props.hasExistCoffee ? (
                  <>
                    <CardHeader color="warning">
                      <LineChart
                        data={props.coffeeForChart}
                        legend="Пачки"
                        height={225}
                        color="#ffffff"
                        type="warning"
                        tooltipTextColor="#ffffff"
                      />
                    </CardHeader>
                    {props.dailyCoffeeIncrease ? (
                      <CardBody>
                        <h4 className={classes.cardTitle}>
                          Дневное колличество помола
                        </h4>
                        <p className={classes.cardCategory}>
                          <span
                            className={
                              props.dailyCoffeeIncrease > 0
                                ? classes.successText
                                : classes.dangerText
                            }>
                            {props.dailyCoffeeIncrease > 0 ? (
                              <ArrowUpward
                                className={classes.upArrowCardCategory}
                              />
                            ) : (
                              <ArrowDownward
                                className={classes.upArrowCardCategory}
                              />
                            )}
                            {props.dailyCoffeeIncrease}%
                          </span>
                          {props.dailyCoffeeIncrease > 0
                            ? 'повышение'
                            : 'снижение'}{' '}
                          продаж сегодня.
                        </p>
                      </CardBody>
                    ) : null}
                    <CardFooter chart>
                      <div className={classes.stats}>
                        {props.dailyCoffeeIncrease
                          ? moment(renderDate).format('D MMMM YYYY')
                          : ' Все время'}
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  <h1 style={{ margin: 20 }} className={classes.cardTitle}>
                    Нет данных про помол
                  </h1>
                )}
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                {props.hasExistPortions ? (
                  <>
                    <CardHeader color="info">
                      <LineChart
                        data={props.portionsForChart}
                        legend="Пачки"
                        height={225}
                        color="#ffffff"
                        type="info"
                        tooltipTextColor="#ffffff"
                      />
                    </CardHeader>
                    {props.dailyPortionsIncrease ? (
                      <CardBody>
                        <h4 className={classes.cardTitle}>
                          Дневные продажи порций
                        </h4>
                        <p className={classes.cardCategory}>
                          <span
                            className={
                              props.dailyPortionsIncrease > 0
                                ? classes.successText
                                : classes.dangerText
                            }>
                            {props.dailyPortionsIncrease > 0 ? (
                              <ArrowUpward
                                className={classes.upArrowCardCategory}
                              />
                            ) : (
                              <ArrowDownward
                                className={classes.upArrowCardCategory}
                              />
                            )}
                            {props.dailyPortionsIncrease}%
                          </span>
                          {props.dailyPortionsIncrease > 0
                            ? 'повышение'
                            : 'снижение'}{' '}
                          продаж сегодня.
                        </p>
                      </CardBody>
                    ) : null}
                    <CardFooter chart>
                      <div className={classes.stats}>
                        {props.dailyPortionsIncrease
                          ? moment(renderDate).format('D MMMM YYYY')
                          : ' Все время'}
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  <h1 style={{ margin: 20 }} className={classes.cardTitle}>
                    Нет данных про порции
                  </h1>
                )}
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Персонал</h4>
                  <p className={classes.cardCategoryWhite}>
                    на дату {moment().format('Do MMMM YYYY')}
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={['Номер', 'Имя', 'Дата приема', 'День рождения']}
                    tableData={props.usersForDashboard}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="warning" icon>
                  <CardIcon color="warning" icon>
                    <BarChartIcon />
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <LineChart
                    data={props.packsForChart}
                    legend="Пачки"
                    height={300}
                    tooltipTextColor="#ffffff"
                    color={warningColor[0]}
                    type="warning"
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="success" icon>
                  <CardIcon color="success" icon>
                    <BarChartIcon />
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <LineChart
                    data={props.packsForChart}
                    legend="Пачки"
                    height={300}
                    tooltipTextColor="#ffffff"
                    color={successColor[0]}
                    type="success"
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const mSTP = createStructuredSelector({
  concatPacks: PacksSelectors.concatDataPacks,
  concatCoffee: CoffeeSelectors.concatDataCoffee,
  concatPortion: PortionsSelectors.concatDataPortions,

  fetchingCoffee: CoffeeSelectors.selectCoffeeFetching,
  fetchingPacks: PacksSelectors.selectPacksFetching,
  fetchingPortions: PortionsSelectors.selectPortionsFetching,

  packsForChart: PacksSelectors.selectPacksForChart,
  coffeeForChart: CoffeeSelectors.selectCoffeeForChart,
  portionsForChart: PortionsSelectors.selectPortionsForChart,

  dailyPacksIncrease: PacksSelectors.selectDailyIncrease,
  dailyCoffeeIncrease: CoffeeSelectors.selectCoffeeDailyIncrease,
  dailyPortionsIncrease: PortionsSelectors.selectDailyPortionsIncrease,

  hasExistCoffee: CoffeeSelectors.selectHasExistCoffee,
  hasExistPacks: PacksSelectors.selectHasExistPack,
  hasExistPortions: PortionsSelectors.selectHasExistPortions,

  usersForDashboard: selectUsersForDashboard,
  dateFilter: CommonSelectors.selectDateFilter,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllCoffee: CoffeeActions.getCoffeeAction,
      getAllPortions: PortionsActions.getPortionAction,
      changeData: PacksActions.getPackAction,
      getUsers: UsersAction.getAllUser,
    },
    dispatch,
  );

Dashboard.propTypes = {
  concatPacks: PropTypes.number.isRequired,
  concatCoffee: PropTypes.number.isRequired,
  concatPortion: PropTypes.number.isRequired,
  changeData: PropTypes.func.isRequired,
  fetchingCoffee: PropTypes.bool.isRequired,
  fetchingPacks: PropTypes.bool.isRequired,
  fetchingPortions: PropTypes.bool.isRequired,
  getAllPortions: PropTypes.func.isRequired,

  hasExistCoffee: PropTypes.bool.isRequired,
  hasExistPortions: PropTypes.bool.isRequired,
  portionsForChart: PropTypes.shape({}).isRequired,
  dailyPortionsIncrease: PropTypes.number.isRequired,
  dailyCoffeeIncrease: PropTypes.number.isRequired,
  coffeeForChart: PropTypes.shape({}).isRequired,
  packsForChart: PropTypes.shape({}).isRequired,
  dailyPacksIncrease: PropTypes.number.isRequired,
  usersForDashboard: PropTypes.arrayOf().isRequired,
  getUsers: PropTypes.func.isRequired,
  getAllCoffee: PropTypes.func.isRequired,
  dateFilter: PropTypes.shape({}).isRequired,
  hasExistPacks: PropTypes.bool.isRequired,
};

export default compose(
  connect(
    mSTP,
    mDTP,
  ),
)(Dashboard);
