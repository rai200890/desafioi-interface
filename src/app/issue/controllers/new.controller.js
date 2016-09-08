export default class NewIssueCtrl {
  constructor(Issue, IssueType, IssueReason, State, Customer) {
    var ctrl = this;

    this.issue = {};
    this.customer = null;
    this.errors = null;
    this.success = null;

    function init() {
      IssueType.fetch().success((response) => {
        ctrl.issue_types = response.issue_types;
      });

      IssueReason.fetch().success((response) => {
        ctrl.issue_reasons = response.issue_reasons;
      });

      State.fetch().success((response) => {
        ctrl.states = response.states;
      });
    };


    this.closeErrors = () => {
      ctrl.errors = null;
    };

    this.closeSuccess = () => {
      ctrl.success = false;
    };

    this.clear = () => {
      ctrl.customer = null;
      ctrl.issue = {};
    };

    this.validate = () => {
      let fields = ['issue_type_id', 'issue_reason_id', 'state_id', 'body'];
      return ctrl.customer && fields.reduce((result, field, index, array) => {
        return result && ctrl.issue[field] != null && ctrl.issue[field] != '';
      });
    };

    this.save = () => {
      ctrl.issue.customer_id = ctrl.customer.id;
      Issue.create({
        issue: ctrl.issue
      }).success((response) => {
        ctrl.success = 'Atendimento nº ' + response.issue.id + ' registrado com sucesso!';
      }).error((response, status_code) => {
        ctrl.errors = response;
      });
    };

    this.getCustomers = (text) => {
      return Customer.fetch(text);
    };

    init();

  };
};

NewIssueCtrl.$inject = ['Issue', 'IssueType', 'IssueReason', 'State', 'Customer'];
