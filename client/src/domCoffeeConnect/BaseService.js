import axios from 'axios';

const defaultHeaders = {
  'Content-Type': 'application/json',
}
const DEFAULT_TIMEOUT = 30000;

export default class BaseService {

  constructor(baseUrl = process.env.REACT_APP_API_URL) {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: { ...defaultHeaders },
      timeout: DEFAULT_TIMEOUT,
    });
  }

  getBaseUrl = () => {
    return this.api.baseURL;
  }

  getContentType = () => {
    return defaultHeaders;
  }

  getGetRequestConfig = () => {
    return {
      data: null,
      headers: {
        ...defaultHeaders,
      },
    };
  }
}
