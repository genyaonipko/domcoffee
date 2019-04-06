import { createActions } from 'reduxsauce'
import { getCoffees, addCoffee } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataCoffee: ['payload'],
  setLoader: ['payload'],
  addCoffee: ['payload'],
  sortCoffeeDataByDay: ['payload'],
  sortCoffeeDataByMonth: ['payload'],
  sortCoffeeDataByQuarter: ['payload'],
  sortCoffeeDataByYear: ['payload'],
}, {})

export const changeDataCoffeeAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getCoffees(dcRequest.getCoffees(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataCoffee(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addCoffeeAction = coffee => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addCoffee(
    // eslint-disable-next-line
    dcRequest.addCoffee(coffee, dateTransaction._d),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addCoffee(data.data.coffee));
      }
    },
  );
};

export const coffeeByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getCoffees(dcRequest.getCoffees(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortCoffeeDataByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const coffeeByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getCoffees(dcRequest.getCoffees(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortCoffeeDataByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const coffeeByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getCoffees(dcRequest.getCoffees(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortCoffeeDataByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const coffeeByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getCoffees(dcRequest.getCoffees(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortCoffeeDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
