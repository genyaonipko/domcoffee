export default class AuthServiceFixture {
  logIn = () => {
    return Promise.resolve({ success: true, token: 'fixture' })
  }
}
