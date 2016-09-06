export default class NewIssueCtrl {
  constructor(Issue, IssueType, IssueReason, State, Customer) {
    var ctrl = this;
    this.issue = {};
    this.errors = null;
    this.success = false;

    IssueType.fetch().success((response) => {
      ctrl.issue_types = response.issue_types;
    });
    IssueReason.fetch().success((response) => {
      ctrl.issue_reasons = response.issue_reasons;
    });
    State.fetch().success((response) => {
      ctrl.states = response.states;
    });
    this.closeErrors = () => {
      ctrl.errors = null;
    };
    this.closeSuccess = () => {
      ctrl.success = false;
    };
    this.clear = () => {
      ctrl.issue = {};
    };
    this.save = () => {
      Issue.create({
        issue: ctrl.issue
      }).success((response) => {
        ctrl.success = true;
      }).error((response, status_code) => {
        ctrl.errors = response;
      });
    };
  };
};

NewIssueCtrl.$inject = ['Issue', 'IssueType', 'IssueReason', 'State', 'Customer'];
