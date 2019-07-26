/* eslint-disable */
import { createActions } from 'reduxsauce'
import { PacksApi } from '../../../domCoffeeConnect/Packs';

const { Creators } = createActions({
  getPackInit: [],
  getPackSuccess: ['payload'],
  getPackFailure: ['payload'],
  addPackSuccess: ['payload'],
  addPackFailure: ['payload'],
}, {})

export const getPackAction = () => dispatch => {
  dispatch(Creators.getPackInit());
  PacksApi.getPacks().then(({ status, data, ...rest }) => {
    if (status === 200) {
      dispatch(Creators.getPackSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.getPackFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.getPackFailure({ error: '' })), 3000);
  });
};

export const addPackAction = pack => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  PacksApi.submitPacks(pack, dateTransaction._d).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addPackSuccess({ data: data.data }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addPackFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.addPackFailure({ error: '' })), 3000);
  })
};
