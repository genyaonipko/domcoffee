import moment from 'moment';
import {
  CHANGE_DATA_COFFEE,
  ADD_COFFEE,
  SORT_COFFEE_BY_DAY,
  SORT_COFFEE_BY_MONTH,
  SORT_COFFEE_BY_QUARTER,
  SORT_COFFEE_BY_YEAR,
} from '../actions/actionTypes';

const initialState = {
  balerina: 0,
  gourme: 0,
  orient: 0,
  servus: 0,
  sera: 0,
  rose: 0,
  opera: 0,
  barista: 0,
  nero: 0,
  italia: 0,
  marone: 0,
  pura: 0,
  verde: 0,
  cote: 0,
  trope: 0,
  java: 0,
  efiopia: 0,
  columbia: 0,
  crema: 0,
};

const changeData = payload => {
  const keys = Object.keys(initialState);
  const concatObj = Object.assign({}, initialState);
  const coffee = payload.reduce((previousValue, currentItem) => {
    for (let i = 0; i < keys.length; i += 1) {
      const current = !Number.isNaN(+currentItem.coffee[keys[i]])
        ? +currentItem.coffee[keys[i]]
        : 0;
      concatObj[keys[i]] = +previousValue[keys[i]] + current;
    }
    return { ...concatObj };
  }, initialState);
  return coffee;
};

function dataReducer(state = initialState, action) {
  const keys = Object.keys(initialState);
  switch (action.type) {
    case CHANGE_DATA_COFFEE: {
      const concatObj = Object.assign({}, initialState);
      const coffee = action.payload.reduce((previousValue, currentItem) => {
        for (let i = 0; i < keys.length; i += 1) {
          const current = !Number.isNaN(+currentItem.coffee[keys[i]])
            ? +currentItem.coffee[keys[i]]
            : 0;
          concatObj[keys[i]] = +previousValue[keys[i]] + current;
        }
        return concatObj;
      }, initialState);
      return coffee;
    }
    case ADD_COFFEE: {
      const obj = { ...state };
      keys.forEach(item => {
        const objItem = !Number.isNaN(+action.payload[item])
          ? +action.payload[item]
          : 0;
        obj[item] = +state[item] + objItem;
      });
      return obj;
    }
    case SORT_COFFEE_BY_DAY: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).date() === moment(Date.now()).date(),
      );
      const sales = changeData(filteredSales);
      return {
        ...state,
        ...sales,
      };
    }
    case SORT_COFFEE_BY_MONTH: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).month() === moment(Date.now()).month(),
      );
      const sales = changeData(filteredSales);
      return {
        ...state,
        ...sales,
      };
    }
    case SORT_COFFEE_BY_QUARTER: {
      const filteredSales = action.payload.filter(
        item =>
          moment(item.createdDate).quarter() === moment(Date.now()).quarter(),
      );
      const sales = changeData(filteredSales);
      return {
        ...state,
        ...sales,
      };
    }
    case SORT_COFFEE_BY_YEAR: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).year() === moment(Date.now()).year(),
      );
      const sales = changeData(filteredSales);
      return {
        ...state,
        ...sales,
      };
    }
    default:
      return state;
  }
}

export default dataReducer;
