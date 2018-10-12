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

export const getSales = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/sales', requestData, responseProcessor);
};

export const addSale = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/sales', requestData, responseProcessor);
};

export const getOwn = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/own', requestData, responseProcessor);
};

export const addOwn = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/own', requestData, responseProcessor);
};

export const getCoffee = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/coffee', requestData, responseProcessor);
};

export const addCoffee = (requestData, responseProcessor) => {
  domCoffeeConnection('/api/coffee', requestData, responseProcessor);
};
