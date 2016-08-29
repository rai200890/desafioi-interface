import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import issue from './issue/index.js';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter, issue])
  .config(routing);

export default MODULE_NAME;
