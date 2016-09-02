export default class IssuesCtrl {
  constructor(Issue) {
    var self = this;
    self.meta = {
      next_page: 1
    };
    self.issues = [];
    self.getIssues = (tableState) => {
      self.isLoading = true;
      var per = 10;
      var page = self.meta.next_page;
      Issue.getIssues({per: 10, page: page}).success((response) => {
        self.issues = response.issues;
        self.meta = response.meta;
        tableState.pagination.numberOfPages = self.meta.total_pages;
        self.isLoading = false;
      });
    }
  }
}

  IssuesCtrl.$inject = ['Issue'];
