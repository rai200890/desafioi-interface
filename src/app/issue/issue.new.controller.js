export default class NewIssueCtrl {
  constructor(Issue) {
    var ctrl = this;
    this.issue = {};
    this.errors = null;
    this.success = false;
    this.closeErrors = () => {
      ctrl.errors = null;
    };
    this.closeSuccess = () => {
      ctrl.success = false;
    };
    this.new = (issue) => {

    };
  };
};

NewIssueCtrl.$inject = ['Issue'];
