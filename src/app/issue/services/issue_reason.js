const API_URL = "http://localhost:3000";
export default class IssueReason {
  constructor($http) {
    this._$http = $http;
  }
  fetch() {
    return this._$http({
      method: "get",
      url: API_URL + "/issue_reasons"
    });
  };
};

IssueReason.$inject = ['$http'];
