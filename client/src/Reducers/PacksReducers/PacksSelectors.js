import moment from 'moment';
import { createSelector } from 'reselect';
import { isNil, isEmpty } from 'ramda';
import { changeData } from '../../utils/helpers';
import { CommonSelectors } from '../CommonReducers';

export const selectPacks = state => state.packs;
export const selectPacksData = createSelector(
  selectPacks,
  packs => packs.data,
);
export const selectPacksFetching = createSelector(
  selectPacks,
  packs => packs.fetching,
);
export const selectPacksError = createSelector(
  selectPacks,
  packs => packs.error,
);
export const selectNormalizedPacksData = createSelector(
  selectPacksData,
  packs => changeData(packs),
);

export const concatDataPacks = createSelector(
  selectNormalizedPacksData,
  packs =>
    Object.values(packs).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    ),
);

export const selectFilteredPacksByDate = createSelector(
  selectPacksData,
  CommonSelectors.selectDateFilter,
  (packs, filter) => {
    if (isEmpty(packs)) return 'all_empty';
    if (isNil(filter)) return 'all_data';
    const filteredPacks = packs.find(
      item =>
        moment(item.createdDate).format('DD MM YYYY') ===
        // eslint-disable-next-line
        moment(filter._d).format('DD MM YYYY'),
    );
    if (isNil(filteredPacks)) return 'empty_day';
    return filteredPacks;
  },
);

export const selectDailyIncrease = createSelector(
  selectFilteredPacksByDate,
  concatDataPacks,
  selectPacksData,
  (packs, concatPacks, allPacks) => {
    if (packs === 'all_data' || packs === 'empty_day' || packs === 'all_empty')
      return null;
    const concatTodayAddedPack = Object.values(packs.data).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    );
    const averagePacksAmount = concatPacks / allPacks.length;
    return ((concatTodayAddedPack / averagePacksAmount - 1) * 100).toFixed(2);
  },
);

export const selectPacksToRender = createSelector(
  selectFilteredPacksByDate,
  selectNormalizedPacksData,
  (packs, allPacks) => {
    if (isNil(packs)) return null;
    let packsToRender;
    switch (packs) {
      case 'all_data':
        packsToRender = allPacks;
        break;
      case 'all_empty':
      case 'empty_day':
        packsToRender = null;
        break;
      default:
        packsToRender = packs.data;
        break;
    }
    return packsToRender;
  },
);

export const selectPacksForTable = createSelector(
  selectPacksToRender,
  packs => {
    if (isNil(packs)) return null;
    const tableData = Object.keys(packs).map(key => [key, packs[key]]);
    return tableData;
  },
);

export const selectPacksForChart = createSelector(
  selectPacksToRender,
  packs => {
    if (isNil(packs)) return null;
    return Object.keys(packs).map(item => ({
      name: item,
      Пачки: +packs[item],
    }));
  },
);

export const selectHasExistPack = createSelector(
  selectPacksForChart,
  packs => {
    return !isNil(packs);
  },
);
