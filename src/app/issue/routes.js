routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('issues_list', {
      url: '/issues',
      template: require('./views/list.html'),
      controller: 'IssuesCtrl',
      controllerAs: 'ctrl'
    }).state('issues_new', {
      url: '/issues/new',
      template: require('./views/new.html'),
      controller: 'NewIssueCtrl',
      controllerAs: 'ctrl'
    }).state('issues_show', {
    url: '/issues/:id',
    template: require('./views/show.html'),
    controller: 'ShowIssueCtrl',
    controllerAs: 'ctrl'
  });
}
