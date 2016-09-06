const API_URL = "http://localhost:3000";
export default class Issue {
  constructor($http) {
    this._$http = $http;
  }
  fetch(params) {
    return this._$http({
      method: "GET",
      url: API_URL + "/issues",
      params: params
    });
  };
  create(params) {
    return this._$http.post(API_URL + "/issues", params);
  };
};

Issue.$inject = ['$http'];
