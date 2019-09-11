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
import AccessTime from '@material-ui/icons/AccessTime';
// import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import BarChartIcon from '@material-ui/icons/BarChart';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import moment from 'moment';
// core components

import GridItem from '../../NewComponents/Grid/GridItem';
import GridContainer from '../../NewComponents/Grid/GridContainer';
import Table from '../../NewComponents/Table/Table';
import Tasks from '../../NewComponents/Tasks/Tasks';
import CustomTabs from '../../NewComponents/CustomTabs/CustomTabs';
// import Danger from '../../NewComponents/Typography/Danger';
import Card from '../../NewComponents/Card/Card';
import CardHeader from '../../NewComponents/Card/CardHeader';
import CardIcon from '../../NewComponents/Card/CardIcon';
import CardBody from '../../NewComponents/Card/CardBody';
import CardFooter from '../../NewComponents/Card/CardFooter';

import AppBarComponent from '../../Components/AppBarComponent';

import SalesActions from '../../Redux/actions/sales';
import PacksActions from '../../Redux/actions/packs';
import InnerActions from '../../Redux/actions/inner';
import OwnActions from '../../Redux/actions/own';
import UsersAction from '../../Redux/actions/users/user';
import { LineChart } from '../../Components/Charts';

import {
  selectDashboardTab1,
  selectDashboardTab2,
} from '../../Redux/reducers/dashboardReducer/selectors';
import {
  concatDataPacks,
  selectPacksForChart,
  selectDailyIncrease,
} from '../../Redux/reducers/packsReducers/selectors';
import {
  concatDataCoffee,
  concatDataPortion,
} from '../../Redux/reducers/salesReducers/selectors';
import { additionalSelectors } from '../../Redux/reducers/additionalReducer';
import { selectUsersForDashboard } from '../../Redux/reducers/usersReducer/selectors';

import { bugs, website, server } from '../../variables/general';

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
  }, []);

  // eslint-disable-next-line
  const renderDate = props.dateFilter._d;

  return (
    <div style={{ paddingTop: 112, width: '100%' }}>
      <AppBarComponent title={APP_BAR_TITLE} />
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
                <p style={{ margin: 0 }}>{moment().format('D MMMM YYYY')}</p>
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
              <p className={classes.cardCategory}>Всего порции</p>
              <h3 className={classes.cardTitle}>
                {props.concatCoffee} <small>шт</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <p style={{ margin: 0 }}>{moment().format('D MMMM YYYY')}</p>
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
              <p className={classes.cardCategory}>Всего помол</p>
              <h3 className={classes.cardTitle}>
                {props.concatPortion} <small>шт</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <p style={{ margin: 0 }}>{moment().format('D MMMM YYYY')}</p>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
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
            <CardBody>
              <h4 className={classes.cardTitle}>Дневные продажи пачек</h4>
              <p className={classes.cardCategory}>
                <span
                  className={
                    props.dailyIncrease > 0
                      ? classes.successText
                      : classes.dangerText
                  }>
                  {props.dailyIncrease > 0 ? (
                    <ArrowUpward className={classes.upArrowCardCategory} />
                  ) : (
                    <ArrowDownward className={classes.upArrowCardCategory} />
                  )}
                  {props.dailyIncrease}%
                </span>
                {props.dailyIncrease > 0 ? 'повышение' : 'снижение'} продаж
                сегодня.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                {moment(renderDate).format('D MMMM YYYY')}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <LineChart
                data={props.packsForChart}
                legend="Пачки"
                height={225}
                color="#ffffff"
                type="warning"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{' '}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {moment().format('D MMMM YYYY')}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <LineChart
                data={props.packsForChart}
                legend="Пачки"
                height={225}
                color="#ffffff"
                type="info"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{' '}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <div
            style={{
              position: 'absolute',
              top: 5,
              left: 15,
              right: 15,
              bottom: 30,
              opacity: 0.5,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <span style={{ fontSize: 40, transform: ['rotate(-20deg)'] }}>
              В процессе разработки
            </span>
          </div>
          <CustomTabs
            title="Задания на сегодня:"
            headerColor="primary"
            tabs={[
              {
                tabName: 'Задание 1',
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: 'Задание 2',
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: 'Задание 3',
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
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
              <Table
                tableHeaderColor="warning"
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
    </div>
  );
};

const mSTP = createStructuredSelector({
  isLoading: additionalSelectors.selectLoader,
  dashboardTab1: selectDashboardTab1,
  dashboardTab2: selectDashboardTab2,
  concatPacks: concatDataPacks,
  concatCoffee: concatDataCoffee,
  concatPortion: concatDataPortion,
  packsForChart: selectPacksForChart,
  dailyIncrease: selectDailyIncrease,
  usersForDashboard: selectUsersForDashboard,
  dateFilter: additionalSelectors.selectDateFilter,
});

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllCoffee: SalesActions.changeDataCoffeeAction,
      getAllPortions: SalesActions.changeDataPortionAction,
      changeData: PacksActions.getPackAction,
      getAllOwn: OwnActions.changeDataOwnpackAction,
      getAllInnerPacks: InnerActions.changeDataInnerpackAction,
      getAllDegustation: PacksActions.changeDataDegustationAction,
      getAllInnerCups: InnerActions.changeDataInnercupAction,
      getAllOwnCups: OwnActions.changeDataOwncupAction,
      getUsers: UsersAction.getAllUser,
    },
    dispatch,
  );

Dashboard.propTypes = {
  concatPacks: PropTypes.number.isRequired,
  concatCoffee: PropTypes.number.isRequired,
  concatPortion: PropTypes.number.isRequired,
  packsForChart: PropTypes.shape({}).isRequired,
  changeData: PropTypes.func.isRequired,
  dashboardTab1: PropTypes.shape({}).isRequired,
  dailyIncrease: PropTypes.number.isRequired,
  usersForDashboard: PropTypes.arrayOf().isRequired,
  getUsers: PropTypes.func.isRequired,
  dateFilter: PropTypes.shape({}).isRequired,
};

export default compose(
  connect(
    mSTP,
    mDTP,
  ),
)(Dashboard);
