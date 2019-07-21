import { createSelector } from 'reselect';
import { changeData } from '../../../utils/helpers';

export const selectCoffee = state => state.coffee;
export const selectCoffeeData = createSelector(selectCoffee, coffee => coffee.data);
export const selectCoffeeFetching = createSelector(selectCoffee, coffee => coffee.fetching);
export const selectCoffeeError = createSelector(selectCoffee, coffee => coffee.error);
export const selectNormalizedCoffeeData = createSelector(selectCoffeeData, coffee => changeData(coffee, 'coffee'))

export const selectCoffeeForChart = createSelector(
  selectNormalizedCoffeeData,
  coffee =>
    coffee &&
    Object.keys(coffee).map(item => ({
      name: item,
      Помол: +coffee[item],
    })),
);

export const concatDataCoffee = createSelector(
  selectNormalizedCoffeeData,
  coffee =>
    Object.values(coffee).reduce(
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);

export const selectPortion = state => state.portions;
export const selectPortionData = createSelector(selectPortion, portions => portions.data);
export const selectPortionFetching = createSelector(selectPortion, portions => portions.fetching);
export const selectPortionError = createSelector(selectPortion, portions => portions.error);
export const selectNormalizedPortionData = createSelector(selectPortionData, portions => changeData(portions, 'portions'))

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
      (previousValue, currentItem) => previousValue + currentItem,
      0,
    ),
);
