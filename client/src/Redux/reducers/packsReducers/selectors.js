import moment from 'moment';
import { createSelector } from 'reselect';
import { isNil } from 'ramda';
import { changeData } from '../../../utils/helpers';
import { additionalSelectors } from '../additionalReducer';

export const selectDegustation = state => state.degustation;
export const selectDegustationData = createSelector(
  selectDegustation,
  degustation => degustation.data,
);
export const selectDegustationFetching = createSelector(
  selectDegustation,
  degustation => degustation.fetching,
);
export const selectDegustationError = createSelector(
  selectDegustation,
  degustation => degustation.error,
);
export const selectNormalizedDegustationData = createSelector(
  selectDegustationData,
  degustation => changeData(degustation),
);

export const selectDegustationForChart = createSelector(
  selectNormalizedDegustationData,
  degustation =>
    degustation &&
    Object.keys(degustation).map(item => ({
      name: item,
      'Дегустационные чашки': +degustation[item],
    })),
);

export const concatDataDegustation = createSelector(
  selectNormalizedDegustationData,
  degustation =>
    Object.values(degustation).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    ),
);

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
  additionalSelectors.selectDateFilter,
  selectNormalizedPacksData,
  (packs, filter, allPacks) => {
    const filteredPacks = packs.find(
      item =>
        moment(item.createdDate).format('DD MM YYYY') ===
        // eslint-disable-next-line
        moment(filter._d).format('DD MM YYYY'),
    );
    if (isNil(filteredPacks)) return { data: allPacks };
    return filteredPacks;
  }
)

export const selectPacksForChart = createSelector(
  selectFilteredPacksByDate,
  packs =>
    packs &&
    Object.keys(packs.data).map(item => ({
      name: item,
      Пачки: +packs.data[item],
    })),
);

export const selectDailyIncrease = createSelector(
  selectFilteredPacksByDate,
  concatDataPacks,
  (packs, concatPacks) => { 
    if (isNil(packs)) return null;
    const concatTodayAddedPack = Object.values(packs.data).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    );
    const averagePacksAmount = concatPacks / packs.length;
    return ((concatTodayAddedPack / averagePacksAmount - 1) * 100).toFixed(2);
  },
);

export const selectPacksForTable = createSelector(selectFilteredPacksByDate, packs => {
  if (isNil(packs)) return null;
  const tableData = Object.keys(packs.data).map(key => [key, packs.data[key]]);
  return tableData;
})