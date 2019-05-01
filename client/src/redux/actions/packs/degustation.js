import { createActions } from 'reduxsauce'
import { getDegustations, addDegustation } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataDegustations: ['payload'],
  setLoader: ['payload'],
  addDegustation: ['payload'],
  sortDegustationByDay: ['payload'],
  sortDegustationByMonth: ['payload'],
  sortDegustationByQuarter: ['payload'],
  sortDegustationByYear: ['payload'],
}, {})

export const changeDataDegustationAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataDegustations(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addDegustationAction = degustation => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addDegustation(
    // eslint-disable-next-line
    dcRequest.addDegustation(degustation, dateTransaction._d),
    (data, error) => {
      if (error !== undefined) {
        dispatch(AdditionalActions.getErrors({ packs: 'Упс, что-то пошло не так 🤷‍' }));
        setTimeout(() => dispatch(AdditionalActions.getErrors({})), 3000);
      } else if (data !== undefined) {
        dispatch(Creators.addDegustation(data.data.degustation));
      }
    },
  );
};

export const degustationByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const degustationByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const degustationByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const degustationByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
