import { createSelector } from 'reselect';
import { changeData } from '../../../utils/helpers';

export const selectDegustation = state => state.degustation;
export const selectDegustationData = createSelector(selectDegustation, degustation => degustation.data);
export const selectDegustationFetching = createSelector(selectDegustation, degustation => degustation.fetching);
export const selectDegustationError = createSelector(selectDegustation, degustation => degustation.error);
export const selectNormalizedDegustationData = createSelector(selectDegustationData, degustation => changeData(degustation))

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
export const selectPacksData = createSelector(selectPacks, packs => packs.data);
export const selectPacksFetching = createSelector(selectPacks, packs => packs.fetching);
export const selectPacksError = createSelector(selectPacks, packs => packs.error);
export const selectNormalizedPacksData = createSelector(selectPacksData, packs => changeData(packs))

export const selectPacksForChart = createSelector(
  selectNormalizedPacksData,
  packs =>
    packs &&
    Object.keys(packs).map(item => ({
      name: item,
      Пачки: +packs[item],
    })),
);

export const concatDataPacks = createSelector(
  selectNormalizedPacksData,
  packs =>
    Object.values(packs).reduce(
      (previousValue, currentItem) => +previousValue + +currentItem,
      0,
    ),
);
