export default class IssuesCtrl {
  constructor(Issue) {
    let ctrl = this;

    ctrl.meta = {
      current_page: 1
    };
    ctrl.per = 15;
    ctrl.issues = [];
    ctrl.isLoading = true;

    ctrl.fetch = (tableState) => {
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
  }
}

IssuesCtrl.$inject = ['Issue'];
