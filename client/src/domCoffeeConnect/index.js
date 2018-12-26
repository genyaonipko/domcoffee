import axios from 'axios';

const domCoffeeConnection = (endpoint, request, responseProcessor) => {
  try {
    axios
      .request({
        url: `https://dom-coffee-app.herokuapp.com${endpoint}`,
        method: request.method,
        headers: request.headers,
        data: request.data,
        timeout: 10000,
      })
      .then(response => {
        responseProcessor(response.data, undefined);
      })
      .catch(error => {
        console.log('Error data: ', error);
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

export const getCoffee = (requestData, responseProcessor) => {
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