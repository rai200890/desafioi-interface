export default class ShowIssueCtrl {
  constructor(Issue, $stateParams){
    var ctrl = this;
    this.issue = null;

    Issue.get($stateParams.id).success((response) => {
      ctrl.issue = response.issue;
    });
  };
}

ShowIssueCtrl.$inject = ['Issue', '$stateParams'];
