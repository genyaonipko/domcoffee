import { createSelector } from 'reselect';

export const selectCoffee = state => state.coffee;
export const selectPortions = state => state.portions;

export const selectCoffeeForChart = createSelector(
  selectCoffee,
  coffee =>
    coffee &&
    Object.keys(coffee).map(item => ({
      name: item,
      Пачки: +coffee[item],
    })),
);

export const selectPortionsForChart = createSelector(
  selectPortions,
  portions =>
    portions &&
    Object.keys(portions).map(item => ({
      name: item,
      'Дегустационные чашки': +portions[item],
    })),
);

export const concatDataCoffee = createSelector(
  selectCoffee,
  coffee =>
    Object.values(coffee).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);

export const concatDataPortions = createSelector(
  selectPortions,
  portions =>
    Object.values(portions).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);
