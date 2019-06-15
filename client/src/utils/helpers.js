import moment from 'moment';
import { mergeWith, add } from 'ramda';

export const filterDataByDay = payload => payload.filter(
  item => 
    moment(item.createdDate).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
)

export const filterDataByMonth = payload => payload.filter(
  item => moment(item.createdDate).format('MM/YYYY') === moment().format('MM/YYYY')
)

export const filterDataByQuarter = payload => payload.filter(
  item => moment(item.createdDate).quarter() === moment().quarter() &&
  moment(item.createdDate).year() === moment().year()
)

export const filterDataByYear = payload => payload.filter(
  item => moment(item.createdDate).year() === moment().year()
)


export const changeData = (payload) => {
  let data = Object.assign({})
  payload.forEach(item => {
    data = mergeWith(add, data, item.coffee);
  });
  return data;
};

export const reduceAdded = (state, initialState, action) => {
  const obj = { ...state };
  Object.keys(initialState).forEach(item => {
    const objItem = !Number.isNaN(+action.payload[item])
      ? +action.payload[item]
      : 0;
    obj[item] = +state[item] + objItem;
  });
  return obj;
}
