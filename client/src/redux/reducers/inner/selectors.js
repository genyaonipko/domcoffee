import { createSelector } from 'reselect';

export const selectInnerpacks = state => state.innerpacks;
export const selectInnercups = state => state.innercups;

export const selectInnerpacksForChart = createSelector(
  selectInnerpacks,
  innerpacks =>
    innerpacks &&
    Object.keys(innerpacks).map(item => ({
      name: item,
      Пачки: +innerpacks[item],
    })),
);

export const selectInnercupsForChart = createSelector(
  selectInnercups,
  innercups =>
    innercups &&
    Object.keys(innercups).map(item => ({
      name: item,
      Чашки: +innercups[item],
    })),
);

export const concatDataInnerpacks = createSelector(
  selectInnerpacks,
  innerpacks =>
    Object.values(innerpacks).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);

export const concatDataInnercups = createSelector(
  selectInnercups,
  innercups =>
    Object.values(innercups).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);
