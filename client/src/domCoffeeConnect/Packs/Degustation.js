import BaseService from '../BaseService';

export default class DegustationService extends BaseService {

  getDegustation = () => {
    return this.api.get('/api/degustation', null, {
      ...this.getGetRequestConfig(),
    })
  }

  submitDegustation = (data, dateTransaction) => {
    return this.api.post('/api/degustation', {
      data,
      dateTransaction,
    })
  }
}
