export default {
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production',
    useFixtures: process.env.REACT_APP_USE_FIXTURE === 'true'
}