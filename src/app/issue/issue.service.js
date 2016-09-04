const API_URL = "http://localhost:3000";
export default class Issue {
  constructor($http) {
    this._$http = $http;
  }
  fetch(params) {
    return this._$http({
      method: "get",
      url: API_URL + "/issues",
      params: params
    });
  };
  create(params) {
    return this._$http({
      method: "post",
      url: API_URL + "/issues",
      params: params
    });
  };
};

Issue.$inject = ['$http'];
