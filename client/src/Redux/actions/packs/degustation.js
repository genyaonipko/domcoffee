/* eslint-disable */
import { createActions } from 'reduxsauce'
import { DegustationApi } from '../../../domCoffeeConnect/Packs';

const { Creators } = createActions({
  getDegustationInit: [],
  getDegustationSuccess: ['payload'],
  getDegustationFailure: ['payload'],
  addDegustationSuccess: ['payload'],
  addDegustationFailure: ['payload'],
}, {})

export const getDegustationAction = () => dispatch => {
  dispatch(Creators.getDegustationInit());
  DegustationApi.getDegustation().then(({ status, data, ...rest }) => {
    if (status === 200) {
      dispatch(Creators.getDegustationSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.getDegustationFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.getDegustationFailure({ error: '' })), 3000);
  });
};

export const addDegustationAction = degustation => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  DegustationApi.submitDegustation(degustation, dateTransaction._d).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addDegustationSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addDegustationFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.addDegustationFailure({ error: '' }), 3000));
  })
};
