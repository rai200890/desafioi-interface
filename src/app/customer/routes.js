routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('customers_new', {
      url: '/customers/new',
      template: require('./views/new.html'),
      controller: 'NewCustomerCtrl',
      controllerAs: 'ctrl'
    });
}
