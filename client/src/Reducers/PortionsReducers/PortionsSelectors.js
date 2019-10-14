import moment from 'moment';
import { createSelector } from 'reselect';
import { isNil, isEmpty } from 'ramda';
import { changeData } from '../../utils/helpers';
import { CommonSelectors } from '../CommonReducers';

export const selectPortions = state => state.portions;
export const selectPortionsData = createSelector(
  selectPortions,
  portions => portions.data,
);
export const selectPortionsFetching = createSelector(
  selectPortions,
  portions => portions.fetching,
);
export const selectPortionsError = createSelector(
  selectPortions,
  portions => portions.error,
);
export const selectNormalizedPortionsData = createSelector(
  selectPortionsData,
  portions => changeData(portions),
);

export const concatDataPortions = createSelector(
  selectNormalizedPortionsData,
  portions =>
    Object.values(portions).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    ),
);

export const selectFilteredPortionsByDate = createSelector(
  selectPortionsData,
  CommonSelectors.selectDateFilter,
  (portions, filter) => {
    if (isEmpty(portions)) return 'all_empty';
    if (isNil(filter)) return 'all_data';
    const filteredPortions = portions.find(
      item =>
        moment(item.createdDate).format('DD MM YYYY') ===
        // eslint-disable-next-line
        moment(filter._d).format('DD MM YYYY'),
    );
    if (isNil(filteredPortions)) return 'empty_day';
    return filteredPortions;
  },
);

export const selectDailyPortionsIncrease = createSelector(
  selectFilteredPortionsByDate,
  concatDataPortions,
  selectPortionsData,
  (portions, concatPortions, allPortions) => {
    if (portions === 'all_data' || portions === 'empty_day' || portions === 'all_empty')
      return null;
    const concatTodayAddedPack = Object.values(portions.data).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    );
    const averagePortionsAmount = concatPortions / allPortions.length;
    return ((concatTodayAddedPack / averagePortionsAmount - 1) * 100).toFixed(2);
  },
);

export const selectPortionsToRender = createSelector(
  selectFilteredPortionsByDate,
  selectNormalizedPortionsData,
  (portions, allPortions) => {
    if (isNil(portions)) return null;
    let portionsToRender;
    switch (portions) {
      case 'all_data':
        portionsToRender = allPortions;
        break;
      case 'all_empty':
      case 'empty_day':
        portionsToRender = null;
        break;
      default:
        portionsToRender = portions.data;
        break;
    }
    return portionsToRender;
  },
);

export const selectPortionsForTable = createSelector(
  selectPortionsToRender,
  portions => {
    if (isNil(portions)) return null;
    const tableData = Object.keys(portions).map(key => [key, portions[key]]);
    return tableData;
  },
);

export const selectPortionsForChart = createSelector(
  selectPortionsToRender,
  portions => {
    if (isNil(portions)) return null;
    return Object.keys(portions).map(item => ({
      name: item,
      Пачки: +portions[item],
    }));
  },
);

export const selectHasExistPortions = createSelector(
  selectPortionsForChart,
  portions => {
    return !isNil(portions);
  },
);
