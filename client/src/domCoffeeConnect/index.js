import axios from 'axios';

const domCoffeeConnection = (endpoint, request, responseProcessor) => {
  try {
    axios
      .request({
        url: `${process.env.REACT_APP_API_URL}${endpoint}`,
        method: request.method,
        headers: request.headers,
        data: request.data,
        timeout: 10000,
      })
      .then(response => {
        responseProcessor(response.data, undefined);
      })
      .catch(error => {
        responseProcessor(undefined, error.response);
      });
  } catch (error) {
    console.log('Error data: ', error);
  }
};

export default domCoffeeConnection;

export const getPacks = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/packs', requestData, responseProcessor);
};

export const addPack = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/packs', requestData, responseProcessor);
};

export const getDegustations = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/degustation', requestData, responseProcessor);
};

export const addDegustation = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/degustation', requestData, responseProcessor);
};

export const getInnercups = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/innercups', requestData, responseProcessor);
};

export const addInnercup = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/innercups', requestData, responseProcessor);
};

export const getInnerpacks = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/innerpacks', requestData, responseProcessor);
};

export const addInnerpack = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/innerpacks', requestData, responseProcessor);
};

export const getOwncups = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/owncups', requestData, responseProcessor);
};

export const addOwncup = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/owncups', requestData, responseProcessor);
};

export const addOwnpack = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/ownpacks', requestData, responseProcessor);
};

export const getOwnpacks = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/ownpacks', requestData, responseProcessor);
};

export const getCoffees = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/coffee', requestData, responseProcessor);
};

export const addCoffee = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/coffee', requestData, responseProcessor);
};

export const getPortions = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/portions', requestData, responseProcessor);
};

export const addPortion = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/portions', requestData, responseProcessor);
};

export const loginUserRequest = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/users/login', requestData, responseProcessor);
};

export const getUsersRequest = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/users/all', requestData, responseProcessor);
};

export const deleteUserRequest = (requestData, responseProcessor) => {
  domCoffeeConnection(`/api/users/${requestData.keys.key}`, requestData, responseProcessor);
};

export const updateUserRequest = (requestData, responseProcessor) => {
  domCoffeeConnection(`/api/users/${requestData.keys.key}`, requestData, responseProcessor);
};
