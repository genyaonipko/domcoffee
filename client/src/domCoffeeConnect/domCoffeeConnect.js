export default class dcRequests {
  static getPacks() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addPack(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static getDegustations() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addDegustation(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
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

  static addOwn(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static getCoffees() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addCoffee(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static getPortions() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addPortion(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static getInnercups() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addInnercup(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static getInnerpacks() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addInnerpack(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static getOwncups() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addOwncup(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static getOwnpacks() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static addOwnpack(data, dateTransaction) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data,
        dateTransaction,
      },
    };
  }

  static loginUserRequest(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: data.email,
        password: data.password,
      },
    };
  }

  static getUsersRequest() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    };
  }

  static deleteUserRequest(key) {
    return {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
      keys: {
        key,
      }
    };
  }

  static updateUserRequest(key, data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
      keys: {
        key,
      }
    };
  }
}
