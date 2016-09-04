export default class IssuesCtrl {
  constructor(Issue){
    var self = this;

    this.meta = {
      current_page: 1
    };

    this.per = 15;
    this.issues = [];
    this.isLoading = true;

    this.get = (tableState) => {
      self.isLoading = true;

      var pagination = {
        per: self.per,
        page: self.meta.next_page
      };

      Issue.getIssues(pagination).success((response) => {
        self.issues = response.issues;
        self.meta = response.meta;
        tableState.pagination.numberOfPages = self.meta.total_pages;
        self.isLoading = false;
      });
    };
  };
};

IssuesCtrl.$inject = ['Issue'];
