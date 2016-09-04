routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('issues', {
      url: '/issues',
      template: require('./list.html'),
      controller: 'IssuesCtrl',
      controllerAs: 'ctrl'
    });
}
