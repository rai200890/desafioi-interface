export default class IssuesCtrl {
  constructor(Issue){
    var ctrl = this;

    this.meta = {
      current_page: 1
    };

    this.per = 15;
    this.issues = [];
    this.isLoading = true;

    this.fetch = (tableState) => {
      ctrl.isLoading = true;

      let pagination = {
        per: ctrl.per,
        page: ctrl.meta.next_page
      };

      Issue.fetch(pagination).success((response) => {
        ctrl.issues = response.issues;
        ctrl.meta = response.meta;
        tableState.pagination.numberOfPages = ctrl.meta.total_pages;
        ctrl.isLoading = false;
      });
    };
  };
};

IssuesCtrl.$inject = ['Issue'];
