export default class NewIssueCtrl {
  constructor(Issue, IssueType, IssueReason, State, Customer) {
    this._Customer = Customer;
    this._Issue = Issue;
    this.issue = {};
    this.customer = null;
    this.errors = null;
    this.success = null;
    this.issueTypes = [];
    this.issueReasons = [];
    this.states = [];

    let ctrl = this;
    IssueType.fetch().success((response) => {
      ctrl.issueTypes = response.issue_types;
    });

    IssueReason.fetch().success((response) => {
      ctrl.issueReasons = response.issue_reasons;
    });

    State.fetch().success((response) => {
      ctrl.states = response.states;
    });
  };

  closeErrors() {
    this.errors = null;
  };

  closeSuccess() {
    this.success = null;
  };

  clear() {
    this.customer = null;
    this.issue = {};
  };

  validate() {
    let fields = ['issue_type_id', 'issue_reason_id', 'state_id', 'body'];
    let issue = this.issue;
    return this.customer && fields.reduce((result, field, index, array) => {
      return result && issue[field] !== '' && issue[field] !== undefined && issue[field] !== null;
    });
  };

  save() {
    let ctrl = this;
    ctrl.issue.customer_id = ctrl.customer.id;
    ctrl._Issue.create({
      issue: ctrl.issue
    }).success((response) => {
      ctrl.success = `Atendimento nº ${response.issue.id} registrado com sucesso!`;
    }).error((response, status_code) => {
      ctrl.errors = response.errors;
    });
  };

  getCustomers(text) {
    return this._Customer.fetch(text);
  };

}

NewIssueCtrl.$inject = ['Issue', 'IssueType', 'IssueReason', 'State', 'Customer'];
