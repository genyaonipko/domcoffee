import BaseService from '../BaseService';

export default class PortionService extends BaseService {

  getPortion = () => {
    const baseUrl = `${this.getBaseUrl()}/api/portions`
    return this.api.get(baseUrl, null)
  }

  submitPortion = (data, dateTransaction) => {
    const baseUrl = `${this.getBaseUrl()}/api/portions`
    return this.api.post(baseUrl, {
      data,
      dateTransaction,
    })
  }
}
