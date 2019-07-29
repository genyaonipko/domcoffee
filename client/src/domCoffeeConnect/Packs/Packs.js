import BaseService from '../BaseService';

export default class PacksService extends BaseService {

  getPacks = () => {
    return this.api.get('/api/packs', null, {
      ...this.getGetRequestConfig(),
    })
  }

  submitPacks = (data, dateTransaction) => {
    return this.api.post('/api/packs', {
      data,
      dateTransaction,
    })
  }

  editPacks = (data, id) => {
    return this.api.put(`/api/packs/${id}`, data)
  }
}
