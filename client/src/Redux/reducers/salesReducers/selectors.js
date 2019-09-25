import { createSelector } from 'reselect';

import moment from 'moment';
import { isNil } from 'ramda';
import { additionalSelectors } from '../additionalReducer';
import { changeData } from '../../../utils/helpers';

export const selectCoffee = state => state.coffee;
export const selectCoffeeData = createSelector(
  selectCoffee,
  packs => packs.data,
);
export const selectCoffeeFetching = createSelector(
  selectCoffee,
  packs => packs.fetching,
);
export const selectCoffeeError = createSelector(
  selectCoffee,
  packs => packs.error,
);
export const selectNormalizedCoffeeData = createSelector(
  selectCoffeeData,
  packs => changeData(packs),
);

export const concatDataCoffee = createSelector(
  selectNormalizedCoffeeData,
  packs =>
    Object.values(packs).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    ),
);

export const selectFilteredCoffeeByDate = createSelector(
  selectCoffeeData,
  additionalSelectors.selectDateFilter,
  (packs, filter) => {
    if (isNil(filter)) return 'all_data';
    const filteredCoffee = packs.find(
      item =>
        moment(item.createdDate).format('DD MM YYYY') ===
        // eslint-disable-next-line
        moment(filter._d).format('DD MM YYYY'),
    );
    if (isNil(filteredCoffee)) return 'empty_day';
    return filteredCoffee;
  },
);

export const selectDailyIncrease = createSelector(
  selectFilteredCoffeeByDate,
  concatDataCoffee,
  selectCoffeeData,
  (packs, concatCoffee, allCoffee) => {
    if (packs === 'all_data' || packs === 'empty_day') return null;
    const concatTodayAddedPack = Object.values(packs.data).reduce(
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
  (packs, allCoffee) => {
    if (isNil(packs)) return null;
    let packsToRender;
    switch (packs) {
      case 'all_data':
        packsToRender = allCoffee;
        break;
      case 'empty_day':
        packsToRender = null;
        break;
      default:
        packsToRender = packs.data;
        break;
    }
    return packsToRender;
  }
)

export const selectCoffeeForTable = createSelector(
  selectCoffeeToRender,
  (packs) => {
    if (isNil(packs)) return null;
    const tableData = Object.keys(packs).map(key => [
      key,
      packs[key],
    ]);
    return tableData;
  },
);

export const selectCoffeeForChart = createSelector(
  selectCoffeeToRender,
  (packs) => {
    if (isNil(packs)) return null;
    return Object.keys(packs).map(item => ({
      name: item,
      Пачки: +packs[item],
    }));
  },
);

export const selectHasExistPack = createSelector(
  selectCoffeeForChart,
  packs => {
    return !isNil(packs);
  },
);


export const selectPortion = state => state.portions;
export const selectPortionData = createSelector(selectPortion, portions => portions.data);
export const selectPortionFetching = createSelector(selectPortion, portions => portions.fetching);
export const selectPortionError = createSelector(selectPortion, portions => portions.error);
export const selectNormalizedPortionData = createSelector(selectPortionData, portions => changeData(portions))

export const selectPortionForChart = createSelector(
  selectNormalizedPortionData,
  portions =>
    portions &&
    Object.keys(portions).map(item => ({
      name: item,
      Порции: +portions[item],
    })),
);

export const concatDataPortion = createSelector(
  selectNormalizedPortionData,
  portions =>
    Object.values(portions).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    ),
);
