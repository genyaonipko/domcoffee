// import { createSelector } from 'reselect';
// import { mergeWith, add } from 'ramda';
// import { selectInnercups, selectInnerpacks } from '../inner/selectors';
// import { selectOwncups, selectOwnpacks } from '../own/selectors';
// import {
//   selectCoffee,
//   selectPortion,
//   selectCoffeeForChart,
//   selectNormalizedPortionData,
// } from '../salesReducers/selectors';
// import { selectPacks, selectDegustation } from '../packsReducers/selectors';

// export const selectPacksByMoney = createSelector(
//   selectPacks,
//   packs =>
//     packs &&
//     Object.keys(packs).map(item => ({
//       name: item,
//       'Пачки за деньги': +packs[item],
//     })),
// );

// export const selectCupsByMoney = createSelector(
//   selectNormalizedPortionData,
//   portions =>
//     portions &&
//     Object.keys(portions).map(item => ({
//       name: item,
//       'Чашки за деньги': +portions[item],
//     })),
// );

// export const selectPacksFree = createSelector(
//   selectCoffee,
//   selectOwnpacks,
//   selectInnerpacks,
//   (coffee, ownpacks, innerpacks) => {
//     const concatData = mergeWith(add, coffee, ownpacks, innerpacks);
//     return (
//       concatData &&
//       Object.keys(concatData).map(item => ({
//         name: item,
//         'Пачки бесплатно': +concatData[item],
//       }))
//     );
//   },
// );

// export const selectCupsFree = createSelector(
//   selectDegustation,
//   selectOwncups,
//   selectInnercups,
//   (degustation, owncups, innercups) => {
//     const concatData = mergeWith(add, degustation, owncups, innercups);
//     return (
//       concatData &&
//       Object.keys(concatData).map(item => ({
//         name: item,
//         'Чашки бесплатно': +concatData[item],
//       }))
//     );
//   },
// );

// export const selectAllCups = createSelector(
//   selectDegustation,
//   selectNormalizedPortionData,
//   selectInnercups,
//   selectOwncups,
//   (degustation, portions, innercups, owncups) => {
//     const concatData = mergeWith(add, degustation, portions, innercups, owncups);
//     return (
//       concatData &&
//       Object.keys(concatData).map(item => ({
//         name: item,
//         'Чашки': +concatData[item],
//       }))
//     );
//   },
// );

// export const selectDashboardTab1 = createSelector(
//   selectPacksByMoney,
//   selectCupsByMoney,
//   selectPacksFree,
//   selectCupsFree,
//   (packsByMoney, cupsByMoney, packsFree, cupsFree) => [
//     packsByMoney,
//     cupsByMoney,
//     packsFree,
//     cupsFree,
//   ],
// );

// export const selectDashboardTab2 = createSelector(
//   selectCoffeeForChart,
//   selectAllCups,
//   (coffee, allcups) => {
//     const normalizedCoffee = coffee.map(item => ({ ...item, 'Помол': item['Помол'] * 25}));
//     return [normalizedCoffee, allcups];
//   },
// );

// export const selectAllTransactions = createSelector(selectDegustation, selectPacks, selectCoffee, selectPortion,
//   ({ data: degustation }, { data: packs }, { data: coffee }, { data: portion }) => ({
//     degustation, packs, coffee, portion
//   })
// )