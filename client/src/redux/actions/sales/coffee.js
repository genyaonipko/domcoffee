import { createActions } from 'reduxsauce'
import { getCoffees, addCoffee } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataCoffee: ['payload'],
  setLoader: ['payload'],
  addCoffee: ['payload'],
  sortCoffeeByDay: ['payload'],
  sortCoffeeByMonth: ['payload'],
  sortCoffeeByQuarter: ['payload'],
  sortCoffeeByYear: ['payload'],
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
        dispatch(AdditionalActions.getErrors({ sales: 'Упс, что-то пошло не так 🤷‍' }));
        setTimeout(() => dispatch(AdditionalActions.getErrors({})), 3000);
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
      dispatch(Creators.sortCoffeeByMonth(data.data));
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
      dispatch(Creators.sortCoffeeByDay(data.data));
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
      dispatch(Creators.sortCoffeeByQuarter(data.data));
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
      dispatch(Creators.sortCoffeeByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
