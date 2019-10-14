/* eslint-disable */
import { createActions } from 'reduxsauce'
import { PacksApi } from '../../Services';

export const { Creators } = createActions({
  getPackInit: [],
  getPackSuccess: ['payload'],
  getPackFailure: ['payload'],
  addPackSuccess: ['payload'],
  addPackFailure: ['payload'],
  selectPackId: ['payload'],
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
  const { dateTransaction } = getState().common;
  PacksApi.submitPacks(pack, dateTransaction._d).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addPackSuccess({ data: data.data, type: 'add' }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addPackFailure({ error: 'Упс, не удалось добавить данные 🤷‍' }));
    setTimeout(() => dispatch(Creators.addPackFailure({ error: '' })), 3000);
  })
};

export const editPackAction = pack => (dispatch, getState) => {
  const { selectedPackId } = getState().packs;
  PacksApi.editPacks(pack, selectedPackId).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addPackSuccess({ data: data.data, type: 'edit' }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addPackFailure({ error: 'Упс, не удалось изменить данные 🤷‍' }));
    setTimeout(() => dispatch(Creators.addPackFailure({ error: '' })), 3000);
  })
};
