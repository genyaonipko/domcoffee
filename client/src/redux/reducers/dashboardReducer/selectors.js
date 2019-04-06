import { createSelector } from 'reselect';
import { merge } from 'ramda';
import { selectInnercups, selectInnerpacks } from '../inner/selectors';
import { selectOwncups, selectOwnpacks } from '../own/selectors';
import { selectCoffee, selectPortions } from '../sales/selectors';
import { selectPacks, selectDegustation } from '../packs/selectors';

export const selectPacksByMoney = createSelector(
  selectPacks,
  packs =>
    packs &&
    Object.keys(packs).map(item => ({
      name: item,
      'Пачки за деньги': +packs[item],
    })),
);

export const selectCupsByMoney = createSelector(
  selectPortions,
  portions =>
    portions &&
    Object.keys(portions).map(item => ({
      name: item,
      'Чашки за деньги': +portions[item],
    })),
);

export const selectPacksFree = createSelector(
  selectCoffee,
  selectOwnpacks,
  selectInnerpacks,
  (coffee, ownpacks, innerpacks) => {
    const concatData = merge(coffee, ownpacks, innerpacks);
    return (
      concatData &&
      Object.keys(concatData).map(item => ({
        name: item,
        'Пачки бесплатно': +concatData[item],
      }))
    );
  },
);

export const selectCupsFree = createSelector(
  selectDegustation,
  selectOwncups,
  selectInnercups,
  (degustation, owncups, innercups) => {
    const concatData = merge(degustation, owncups, innercups);
    return (
      concatData &&
      Object.keys(concatData).map(item => ({
        name: item,
        'Чашки бесплатно': +concatData[item],
      }))
    );
  },
);

export const selectDashboardTab1 = createSelector(
  selectPacksByMoney,
  selectCupsByMoney,
  selectPacksFree,
  selectCupsFree,
  (packsByMoney, cupsByMoney, packsFree, cupsFree) => [
    packsByMoney,
    cupsByMoney,
    packsFree,
    cupsFree,
  ],
);
