import BaseService from '../BaseService';

export default class AuthService extends BaseService {

  registerUser = user => {
    return this.api.post('/api/users/register', user)
  }

  logIn = user => {
    return this.api.post('/api/users/login', user)
  }
}
