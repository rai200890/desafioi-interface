import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './routes.js';

import IssuesCtrl from './controllers/list.controller.js';
import NewIssueCtrl from './controllers/new.controller.js';
import ShowIssueCtrl from './controllers/show.controller.js';

import Issue from './services/issue.js';
import IssueType from './services/issue_type.js';
import IssueReason from './services/issue_reason.js';
import State from './services/state.js';

export default angular.module('app.issue', [uirouter])
  .config(routing)
  .controller('IssuesCtrl', IssuesCtrl)
  .controller('NewIssueCtrl', NewIssueCtrl)
  .controller('ShowIssueCtrl', ShowIssueCtrl)
  .service('Issue', Issue)
  .service('IssueType', IssueType)
  .service('IssueReason', IssueReason)
  .service('State', State)
  .name;
