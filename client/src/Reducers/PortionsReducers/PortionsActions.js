/* eslint-disable */
import { createActions } from 'reduxsauce'
import { PortionsApi } from '../../Services';

export const { Creators } = createActions({
  getPortionInit: [],
  getPortionSuccess: ['payload'],
  getPortionFailure: ['payload'],
  addPortionSuccess: ['payload'],
  addPortionFailure: ['payload'],
  selectPortionId: ['payload'],
}, {})

export const getPortionAction = () => dispatch => {
  dispatch(Creators.getPortionInit());
  PortionsApi.getPortion().then(({ status, data, ...rest }) => {
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

export const addPortionAction = portion => (dispatch, getState) => {
  const { dateTransaction } = getState().common;
  PortionsApi.submitPortion(portion, dateTransaction._d).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addPortionSuccess({ data: data.data, type: 'add' }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addPortionFailure({ error: 'Упс, что-то пошло не так 🤷‍' }));
    setTimeout(() => dispatch(Creators.addPortionFailure({ error: '' })), 3000);
  })
};

export const editPortionAction = portion => (dispatch, getState) => {
  const { selectedPortionId } = getState().portions;
  PortionsApi.editPortion(portion, selectedPortionId).then(({ status, data }) => {
    if (status === 200) {
      dispatch(Creators.addPortionSuccess({ data: data.data, type: 'edit' }));
    }
  }).catch(err => {
    // Fix me errors on backend
    console.log(err);
    dispatch(Creators.addPortionFailure({ error: 'Упс, не удалось изменить данные 🤷‍' }));
    setTimeout(() => dispatch(Creators.addPortionFailure({ error: '' })), 3000);
  })
};