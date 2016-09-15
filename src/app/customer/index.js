import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './routes.js';

import NewCustomerCtrl from './controllers/new.controller.js';

export default angular.module('app.customer', [uirouter])
  .config(routing)
  .controller('NewCustomerCtrl', NewCustomerCtrl)
  .name;
