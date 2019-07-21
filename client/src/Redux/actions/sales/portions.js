/* eslint-disable */
import { createActions } from 'reduxsauce'
import { PortionApi } from '../../../domCoffeeConnect/Sales';

const { Creators } = createActions({
  getPortionInit: [],
  getPortionSuccess: ['payload'],
  getPortionFailure: ['payload'],
  addPortionSuccess: ['payload'],
  addPortionFailure: ['payload'],
}, {})

export const getPortionAction = () => dispatch => {
  dispatch(Creators.getPortionInit());
  PortionApi.getPortion().then(({ status, data, ...rest }) => {
    if (status === 200) {
      dispatch(Creators.getPortionSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.getPortionFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.getPortionFailure({ error: '' })), 3000);
  });
};

export const addPortionAction = coffee => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  PortionApi.submitPortion(coffee, dateTransaction._d).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addPortionSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addPortionFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.addPortionFailure({ error: '' })), 3000);
  })
};
