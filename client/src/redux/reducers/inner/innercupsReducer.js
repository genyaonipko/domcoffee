import {
  CHANGE_DATA_INNERCUPS,
  ADD_INNERCUP,
  SORT_INNERCUP_BY_MONTH,
  SORT_INNERCUP_BY_DAY,
  SORT_INNERCUP_BY_QUARTER,
  SORT_INNERCUP_BY_YEAR,
} from '../../actions/actionTypes';
import {
  filterDataByDay,
  filterDataByMonth,
  filterDataByQuarter,
  filterDataByYear,
} from '../../../utils/helpers';

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
  const innercups = payload.reduce((previousValue, currentItem) => {
    for (let i = 0; i < keys.length; i += 1) {
      const current = !Number.isNaN(+currentItem.innercups[keys[i]])
        ? +currentItem.innercups[keys[i]]
        : 0;
      concatObj[keys[i]] = +previousValue[keys[i]] + current;
    }
    return { ...concatObj };
  }, initialState);
  return innercups;
};

function innercupssReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATA_INNERCUPS: {
      const innercups = changeData(action.payload);
      return { ...state, ...innercups };
    }
    case ADD_INNERCUP: {
      const obj = { ...state };
      Object.keys(initialState).forEach(item => {
        const objItem = !Number.isNaN(+action.payload[item])
          ? +action.payload[item]
          : 0;
        obj[item] = +state[item] + objItem;
      });
      return obj;
    }
    case SORT_INNERCUP_BY_DAY: {
      const filteredSales = action.payload.filter(
        item => filterDataByDay(item.createdDate)
      );
      const innercups = changeData(filteredSales);
      return {
        ...state,
        ...innercups,
      };
    }
    case SORT_INNERCUP_BY_MONTH: {
      const filteredSales = action.payload.filter(
        item => filterDataByMonth(item.createdDate)
      );
      const innercups = changeData(filteredSales);
      return {
        ...state,
        ...innercups,
      };
    }
    case SORT_INNERCUP_BY_QUARTER: {
      const filteredSales = action.payload.filter(
        item => filterDataByQuarter(item.createdDate)
      );
      const innercups = changeData(filteredSales);
      return {
        ...state,
        ...innercups,
      };
    }
    case SORT_INNERCUP_BY_YEAR: {
      const filteredSales = action.payload.filter(
        item => filterDataByYear(item.createdDate)
      );
      const innercups = changeData(filteredSales);
      return {
        ...state,
        ...innercups,
      };
    }
    default:
      return state;
  }
}

export default innercupssReducer;
