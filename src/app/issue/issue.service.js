const API_URL = "http://localhost:3000";
export default class Issue {
  constructor($http) {
   this._$http = $http;
  }
  getIssues() {
   return this._$http({
     method: "get",
     url: API_URL+"/issues",
     params: {}
   });
 };
}

Issue.$inject = ['$http'];
