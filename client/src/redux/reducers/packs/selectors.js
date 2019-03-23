import { createSelector } from 'reselect';

export const selectPacks = state => state.packs;
export const selectDegustation = state => state.degustation;

export const selectPacksForChart = createSelector(
  selectPacks,
  packs =>
    packs &&
    Object.keys(packs).map(item => ({
      name: item,
      Пачки: +packs[item],
    })),
);

export const selectDegustationForChart = createSelector(
  selectDegustation,
  degustation =>
    degustation &&
    Object.keys(degustation).map(item => ({
      name: item,
      Чашки: +degustation[item],
    })),
);

export const concatDataPacks = createSelector(
  selectPacks,
  packs =>
    Object.values(packs).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);

export const concatDataDegustation = createSelector(
  selectDegustation,
  degustation =>
    Object.values(degustation).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);
