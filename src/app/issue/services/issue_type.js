export default class IssueType {
  constructor($http, API_URL) {
    this._$http = $http;
    this._API_URL = API_URL;
  }
  fetch() {
    return this._$http({
      method: "get",
      url: this._API_URL + "/issue_types"
    });
  };
};

IssueType.$inject = ['$http', 'API_URL'];
