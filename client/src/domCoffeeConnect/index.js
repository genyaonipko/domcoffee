import axios from 'axios';

const domCoffeeConnection = (endpoint, request, responseProcessor) => {
  try {
    axios
      .request({
        url: `http://80.209.225.150:5000${endpoint}`,
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
  domCoffeeConnection('/sales', requestData, responseProcessor);
};

export const addSale = (requestData, responseProcessor) => {
  domCoffeeConnection('/sales', requestData, responseProcessor);
};

export const getOwn = (requestData, responseProcessor) => {
  domCoffeeConnection('/own', requestData, responseProcessor);
};

export const addOwn = (requestData, responseProcessor) => {
  domCoffeeConnection('/own', requestData, responseProcessor);
};

export const getCoffee = (requestData, responseProcessor) => {
  domCoffeeConnection('/coffee', requestData, responseProcessor);
};

export const addCoffee = (requestData, responseProcessor) => {
  domCoffeeConnection('/coffee', requestData, responseProcessor);
};
