import { createActions } from 'reduxsauce'
import { getOwncups, addOwncup } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataOwncup: ['payload'],
  setLoader: ['payload'],
  addOwncup: ['payload'],
  sortOwncupByDay: ['payload'],
  sortOwncupByMonth: ['payload'],
  sortOwncupByQuarter: ['payload'],
  sortOwncupByYear: ['payload'],
}, {})

export const changeDataOwncupAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataOwncup(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addOwncupAction = owncup => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addOwncup(
    // eslint-disable-next-line
    dcRequest.addOwncup(owncup, dateTransaction._d),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addOwncup(data.data.owncups));
      }
    },
  );
};

export const owncupByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwncupByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const owncupByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwncupByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const owncupByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwncupByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const owncupByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwncupByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
