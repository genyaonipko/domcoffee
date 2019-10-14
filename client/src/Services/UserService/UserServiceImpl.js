import BaseService from '../BaseService';

class UserService extends BaseService {

  getUsers = () => {
    return this.api.get('/api/users/all', null)
  }

  // editUser = (data, id) => {
  //   return this.api.put(`/api/portions/${id}`, data)
  // }
}

export default UserService;
