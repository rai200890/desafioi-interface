import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './issue.routes.js';
import IssuesCtrl from './issue.list.controller.js';
import NewIssueCtrl from './issue.new.controller.js';
import Issue from './issue.service.js';

export default angular.module('app.issue', [uirouter])
  .config(routing)
  .controller('IssuesCtrl', IssuesCtrl)
  .controller('NewIssueCtrl', NewIssueCtrl)
  .service('Issue', Issue)
  .name;
