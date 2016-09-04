const API_URL = "http://localhost:3000";
export default class Issue {
  constructor($http) {
   this._$http = $http;
  }
  getIssues(params) {
    var p = params;
    return this._$http({
     method: "get",
     url: API_URL +"/issues",
     params: p
   });
 };
}

Issue.$inject = ['$http'];
