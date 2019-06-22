import { createSelector } from 'reselect';

export const selectOwnpacks = state => state.ownpacks;
export const selectOwncups = state => state.owncups;

export const selectOwnpacksForChart = createSelector(
  selectOwnpacks,
  ownpacks =>
    ownpacks &&
    Object.keys(ownpacks).map(item => ({
      name: item,
      Пачки: +ownpacks[item],
    })),
);

export const selectOwncupsForChart = createSelector(
  selectOwncups,
  owncups =>
    owncups &&
    Object.keys(owncups).map(item => ({
      name: item,
      Чашки: +owncups[item],
    })),
);

export const concatDataOwnpacks = createSelector(
  selectOwnpacks,
  ownpacks =>
    Object.values(ownpacks).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);

export const concatDataOwncups = createSelector(
  selectOwncups,
  owncups =>
    Object.values(owncups).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);
