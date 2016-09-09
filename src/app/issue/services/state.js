export default class State {
  constructor($http, API_URL) {
    this._$http = $http;
    this._API_URL = API_URL;
  }
  fetch() {
    return this._$http({
      method: "get",
      url: this._API_URL + "/states"
    });
  };
};

State.$inject = ['$http','API_URL'];
