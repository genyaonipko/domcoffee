import moment from 'moment';

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


export const changeData = (payload, initialState, type) => {
  const keys = Object.keys(initialState);
  const concatObj = Object.assign({}, initialState);
  const data = payload.reduce((previousValue, currentItem) => {
    for (let i = 0; i < keys.length; i += 1) {
      const current = !Number.isNaN(+currentItem[type][keys[i]])
        ? +currentItem[type][keys[i]]
        : 0;
      concatObj[keys[i]] = +previousValue[keys[i]] + current;
    }
    return { ...concatObj };
  }, initialState);
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
