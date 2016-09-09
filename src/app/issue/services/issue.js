export default class Issue {
  constructor($http, API_URL) {
    this._$http = $http;
    this._API_URL = API_URL;
  }
  fetch(params) {
    return this._$http({
      method: "GET",
      url: this._API_URL + "/issues",
      params: params
    });
  };
  create(params) {
    return this._$http.post(this._API_URL + "/issues", params);
  };
};

Issue.$inject = ['$http', 'API_URL'];
