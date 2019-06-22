import BaseService from '../BaseService';

export default class PortionService extends BaseService {

  getPortion = () => {
    return this.api.get('/api/portions', null)
  }

  submitPortion = (data, dateTransaction) => {
    return this.api.post('/api/portions', {
      data,
      dateTransaction,
    })
  }
}
