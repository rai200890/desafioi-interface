export default class IssuesCtrl {
  constructor(Issue) {
      var self = this;
      this.issues = [];
      this.pagination = {};
      Issue.getIssues().success((response) => {
        self.issues = response.issues;
        self.pagination = response.meta;
      });
  }
}

IssuesCtrl.$inject = ['Issue'];
