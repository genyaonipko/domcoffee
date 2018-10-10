export default class dcRequests {
  static getSales() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }
  static addSale(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
  }
  static getOwn() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }
  static addOwn(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
  }
  static getCoffee() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }
  static addCoffee(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
  }
}
