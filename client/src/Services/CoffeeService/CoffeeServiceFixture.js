import BaseService from '../BaseService';

class CoffeeService extends BaseService {

  getCoffee = () => {
    return this.api.get('/api/coffee', null, {
      ...this.getGetRequestConfig(),
    })
  }

  submitCoffee = (data, dateTransaction) => {
    return this.api.post('/api/coffee', {
      data,
      dateTransaction,
    })
  }

  editCoffee = (data, id) => {
    return this.api.put(`/api/coffee/${id}`, data)
  }
}

export default new CoffeeService();
