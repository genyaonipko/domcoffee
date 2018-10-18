import moment from 'moment';
import {
  CHANGE_DATA_PORTIONS,
  ADD_PORTION,
  SORT_PORTION_BY_MONTH,
  SORT_PORTION_BY_DAY,
  SORT_PORTION_BY_QUARTER,
  SORT_PORTION_BY_YEAR,
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
  const portions = payload.reduce((previousValue, currentItem) => {
    for (let i = 0; i < keys.length; i += 1) {
      const current = !Number.isNaN(+currentItem.portions[keys[i]])
        ? +currentItem.portions[keys[i]]
        : 0;
      concatObj[keys[i]] = +previousValue[keys[i]] + current;
    }
    return { ...concatObj };
  }, initialState);
  return portions;
};

function dataReducer(state = initialState, action) {
  const keys = Object.keys(initialState);
  switch (action.type) {
    case CHANGE_DATA_PORTIONS: {
      const portion = changeData(action.payload);
      return { ...state, ...portion };
    }
    case ADD_PORTION: {
      const obj = { ...state };
      console.log(action.payload);
      keys.forEach(item => {
        const objItem = !Number.isNaN(+action.payload[item])
          ? +action.payload[item]
          : 0;
        obj[item] = +state[item] + objItem;
      });
      return obj;
    }
    case SORT_PORTION_BY_DAY: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).date() === moment(Date.now()).date(),
      );
      const portions = changeData(filteredSales);
      return {
        ...state,
        ...portions,
      };
    }
    case SORT_PORTION_BY_MONTH: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).month() === moment(Date.now()).month(),
      );
      const portions = changeData(filteredSales);
      return {
        ...state,
        ...portions,
      };
    }
    case SORT_PORTION_BY_QUARTER: {
      const filteredSales = action.payload.filter(
        item =>
          moment(item.createdDate).quarter() === moment(Date.now()).quarter(),
      );
      const portions = changeData(filteredSales);
      return {
        ...state,
        ...portions,
      };
    }
    case SORT_PORTION_BY_YEAR: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).year() === moment(Date.now()).year(),
      );
      const portions = changeData(filteredSales);
      return {
        ...state,
        ...portions,
      };
    }
    default:
      return state;
  }
}

export default dataReducer;
