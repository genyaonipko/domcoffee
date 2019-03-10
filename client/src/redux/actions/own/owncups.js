import { createActions } from 'reduxsauce'
import { getOwncups, addOwncup } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataOwncups: ['payload'],
  setLoader: ['payload'],
  addOwncup: ['payload'],
  sortOwncupDataByDay: ['payload'],
  sortOwncupDataByMonth: ['payload'],
  sortOwncupDataByQuarter: ['payload'],
  sortOwncupDataByYear: ['payload'],
}, {})

export const changeDataOwncupAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataOwncups(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addOwncupAction = owncup => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addOwncup(
    dcRequest.addOwncup(owncup, dateTransaction),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addOwncup(data.data.owncup));
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
      dispatch(Creators.sortOwncupDataByMonth(data.data));
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
      dispatch(Creators.sortOwncupDataByDay(data.data));
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
      dispatch(Creators.sortOwncupDataByQuarter(data.data));
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
      dispatch(Creators.sortOwncupDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
