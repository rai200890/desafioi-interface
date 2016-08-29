import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './issue.routes.js';
import IssuesCtrl from './issue.list.controller.js';

export default angular.module('app.issue', [uirouter])
  .config(routing)
  .controller('IssuesCtrl', IssuesCtrl)
  .name;
