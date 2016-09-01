export default class IssuesCtrl {
  constructor(Issue) {
    var self = this;
    this.issues = [];
    this.pagination = {};
    Issue.getIssues().success(function(response, statusCode, headers){
      self.issues = response['issues'];
      self.pagination = response['meta'];
    });
  }
}

IssuesCtrl.$inject = ['Issue'];
