/* eslint-disable */
import { createActions } from 'reduxsauce'
import { CoffeeApi } from '../../../domCoffeeConnect/Sales';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  getCoffeeInit: [],
  getCoffeeSuccess: ['payload'],
  getCoffeeFailure: ['payload'],
  addCoffeeSuccess: ['payload'],
  addCoffeeFailure: ['payload'],
}, {})

export const getCoffeeAction = () => dispatch => {
  dispatch(Creators.getCoffeeInit());
  CoffeeApi.getCoffee().then(({ status, data, ...rest }) => {
    if (status === 200) {
      dispatch(Creators.getCoffeeSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.getCoffeeFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.getCoffeeFailure({ error: '' })), 3000);
  });
};

export const addCoffeeAction = coffee => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  CoffeeApi.submitCoffee(coffee, dateTransaction._d).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addCoffeeSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addCoffeeFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.addCoffeeFailure({ error: '' })), 3000);
  })
};
