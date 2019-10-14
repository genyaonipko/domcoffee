import BaseService from '../BaseService';

class PortionService extends BaseService {

  getPortion = () => {
    return this.api.get('/api/portions', null)
  }

  submitPortion = (data, dateTransaction) => {
    return this.api.post('/api/portions', {
      data,
      dateTransaction,
    })
  }

  editPortion = (data, id) => {
    return this.api.put(`/api/portions/${id}`, data)
  }
}

export default PortionService;
