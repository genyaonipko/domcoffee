import moment from 'moment';
import {
  CHANGE_DATA_PACKS,
  ADD_PACKS,
  SORT_PACKS_BY_DAY,
  SORT_PACKS_BY_MONTH,
  SORT_PACKS_BY_QUARTER,
  SORT_PACKS_BY_YEAR,
} from '../../actions/actionTypes';

const initialState = {
  balerina: 0,
  gourme: 0,
  orient: 0,
  symphony: 0,
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
  const packs = payload.reduce((previousValue, currentItem) => {
    for (let i = 0; i < keys.length; i += 1) {
      const current = !Number.isNaN(+currentItem.packs[keys[i]])
        ? +currentItem.packs[keys[i]]
        : 0;
      concatObj[keys[i]] = +previousValue[keys[i]] + current;
    }
    return { ...concatObj };
  }, initialState);
  return packs;
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATA_PACKS: {
      const packs = changeData(action.payload);
      return { ...state, ...packs };
    }
    case ADD_PACKS: {
      const obj = { ...state };
      Object.keys(initialState).forEach(item => {
        const objItem = !Number.isNaN(+action.payload[item])
          ? +action.payload[item]
          : 0;
        obj[item] = +state[item] + objItem;
      });
      return obj;
    }
    case SORT_PACKS_BY_DAY: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).date() === moment(Date.now()).date(),
      );
      const packs = changeData(filteredSales);
      return {
        ...state,
        ...packs,
      };
    }
    case SORT_PACKS_BY_MONTH: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).month() === moment(Date.now()).month(),
      );
      const packs = changeData(filteredSales);
      return {
        ...state,
        ...packs,
      };
    }
    case SORT_PACKS_BY_QUARTER: {
      const filteredSales = action.payload.filter(
        item =>
          moment(item.createdDate).quarter() === moment(Date.now()).quarter(),
      );
      const packs = changeData(filteredSales);
      return {
        ...state,
        ...packs,
      };
    }
    case SORT_PACKS_BY_YEAR: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).year() === moment(Date.now()).year(),
      );
      const packs = changeData(filteredSales);
      return {
        ...state,
        ...packs,
      };
    }
    default:
      return state;
  }
}

export default dataReducer;
