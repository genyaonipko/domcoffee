import { createSelector } from 'reselect';

import moment from 'moment';
import { isNil, isEmpty } from 'ramda';
import { CommonSelectors } from '../CommonReducers';
import { changeData } from '../../utils/helpers';

export const selectCoffee = state => state.coffee;
export const selectCoffeeData = createSelector(
  selectCoffee,
  coffee => coffee.data,
);
export const selectCoffeeFetching = createSelector(
  selectCoffee,
  coffee => coffee.fetching,
);
export const selectCoffeeError = createSelector(
  selectCoffee,
  coffee => coffee.error,
);
export const selectNormalizedCoffeeData = createSelector(
  selectCoffeeData,
  coffee => changeData(coffee),
);

export const concatDataCoffee = createSelector(
  selectNormalizedCoffeeData,
  coffee =>
    Object.values(coffee).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    ),
);

export const selectFilteredCoffeeByDate = createSelector(
  selectCoffeeData,
  CommonSelectors.selectDateFilter,
  (coffee, filter) => {
    if (isEmpty(coffee)) return 'all_empty'
    if (isNil(filter)) return 'all_data';
    const filteredCoffee = coffee.find(
      item =>
        moment(item.createdDate).format('DD MM YYYY') ===
        // eslint-disable-next-line
        moment(filter._d).format('DD MM YYYY'),
    );
    if (isNil(filteredCoffee)) return 'empty_day';
    return filteredCoffee;
  },
);

export const selectCoffeeDailyIncrease = createSelector(
  selectFilteredCoffeeByDate,
  concatDataCoffee,
  selectCoffeeData,
  (coffee, concatCoffee, allCoffee) => {
    if (coffee === 'all_data' || coffee === 'empty_day' || coffee === 'all_empty') return null;
    const concatTodayAddedPack = Object.values(coffee.data).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    );
    const averageCoffeeAmount = concatCoffee / allCoffee.length;
    return ((concatTodayAddedPack / averageCoffeeAmount - 1) * 100).toFixed(2);
  },
);

export const selectCoffeeToRender = createSelector(
  selectFilteredCoffeeByDate,
  selectNormalizedCoffeeData,
  (coffee, allCoffee) => {
    if (isNil(coffee)) return null;
    let coffeeToRender;
    switch (coffee) {
      case 'all_data':
        coffeeToRender = allCoffee;
        break;
      case 'all_empty':
      case 'empty_day':
        coffeeToRender = null;
        break;
      default:
        coffeeToRender = coffee.data;
        break;
    }
    return coffeeToRender;
  }
)

export const selectCoffeeForTable = createSelector(
  selectCoffeeToRender,
  (coffee) => {
    if (isNil(coffee)) return null;
    const tableData = Object.keys(coffee).map(key => [
      key,
      coffee[key],
    ]);
    return tableData;
  },
);

export const selectCoffeeForChart = createSelector(
  selectCoffeeToRender,
  (coffee) => {
    if (isNil(coffee)) return null;
    return Object.keys(coffee).map(item => ({
      name: item,
      Пачки: +coffee[item],
    }));
  },
);

export const selectHasExistCoffee = createSelector(
  selectCoffeeForChart,
  coffee => {
    return !isNil(coffee);
  },
);
