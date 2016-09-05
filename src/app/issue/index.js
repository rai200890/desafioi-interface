import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './issue.routes.js';
import IssuesCtrl from './issue.list.controller.js';
import NewIssueCtrl from './issue.new.controller.js';
import Issue from './issue.service.js';
import IssueType from './issue_type.service.js';
import IssueReason from './issue_reason.service.js';
import State from './state.service.js';

export default angular.module('app.issue', [uirouter])
  .config(routing)
  .controller('IssuesCtrl', IssuesCtrl)
  .controller('NewIssueCtrl', NewIssueCtrl)
  .service('Issue', Issue)
  .service('IssueType', IssueType)
  .service('IssueReason', IssueReason)
  .service('State', State)
  .name;
