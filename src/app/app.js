import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import issue from './issue/index';
import uibootstrap from 'angular-ui-bootstrap';
import smarttable from 'angular-smart-table';

const MODULE_NAME = 'app';
const API_URL = process.env.API_URL;

angular.module(MODULE_NAME, [uirouter, uibootstrap, issue, smarttable])
  .config(routing)
  .value('API_URL', process.env.API_URL);

export default MODULE_NAME;
