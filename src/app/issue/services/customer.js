const API_URL = "http://localhost:3000";

export default class Customer {
  constructor($http) {
    this._$http = $http;
  }
  fetch() {
    return this._$http({
      method: "get",
      url: API_URL + "/customers"
    }).success(function(response){
      console.log(response);
      return response
    });
  };
};
