import moment from 'moment';
import {
  CHANGE_DATA_OWNPACKS,
  ADD_OWNPACK,
  SORT_OWNPACK_BY_MONTH,
  SORT_OWNPACK_BY_DAY,
  SORT_OWNPACK_BY_QUARTER,
  SORT_OWNPACK_BY_YEAR,
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
  const ownpacks = payload.reduce((previousValue, currentItem) => {
    for (let i = 0; i < keys.length; i += 1) {
      const current = !Number.isNaN(+currentItem.ownpacks[keys[i]])
        ? +currentItem.ownpacks[keys[i]]
        : 0;
      concatObj[keys[i]] = +previousValue[keys[i]] + current;
    }
    return { ...concatObj };
  }, initialState);
  return ownpacks;
};

function ownpackssReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATA_OWNPACKS: {
      const ownpacks = changeData(action.payload);
      return { ...state, ...ownpacks };
    }
    case ADD_OWNPACK: {
      const obj = { ...state };
      Object.keys(initialState).forEach(item => {
        const objItem = !Number.isNaN(+action.payload[item])
          ? +action.payload[item]
          : 0;
        obj[item] = +state[item] + objItem;
      });
      return obj;
    }
    case SORT_OWNPACK_BY_DAY: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).date() === moment(Date.now()).date(),
      );
      const ownpacks = changeData(filteredSales);
      return {
        ...state,
        ...ownpacks,
      };
    }
    case SORT_OWNPACK_BY_MONTH: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).month() === moment(Date.now()).month(),
      );
      const ownpacks = changeData(filteredSales);
      return {
        ...state,
        ...ownpacks,
      };
    }
    case SORT_OWNPACK_BY_QUARTER: {
      const filteredSales = action.payload.filter(
        item =>
          moment(item.createdDate).quarter() === moment(Date.now()).quarter(),
      );
      const ownpacks = changeData(filteredSales);
      return {
        ...state,
        ...ownpacks,
      };
    }
    case SORT_OWNPACK_BY_YEAR: {
      const filteredSales = action.payload.filter(
        item => moment(item.createdDate).year() === moment(Date.now()).year(),
      );
      const ownpacks = changeData(filteredSales);
      return {
        ...state,
        ...ownpacks,
      };
    }
    default:
      return state;
  }
}

export default ownpackssReducer;
