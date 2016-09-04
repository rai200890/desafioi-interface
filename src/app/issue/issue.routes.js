routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('issues_list', {
      url: '/issues',
      template: require('./list.html'),
      controller: 'IssuesCtrl',
      controllerAs: 'ctrl'
    }).state('issues_new', {
      url: '/issues/new',
      template: require('./new.html'),
      controller: 'NewIssueCtrl',
      controllerAs: 'ctrl'
    });
}
