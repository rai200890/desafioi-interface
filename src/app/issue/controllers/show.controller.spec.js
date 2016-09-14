import testHelper from "../helper.spec"

  describe('ShowIssueCtrl', () => {
    let ctrl;
    let httpBackend;
    let response = require('json!../fixtures/issue.json');

    beforeEach(() => {
      angular.mock.module(testHelper.app);
      angular.mock.inject(($controller, $httpBackend) => {
        ctrl = $controller('ShowIssueCtrl', {$stateParams: {id: 6}});
        httpBackend = $httpBackend;
      });

      httpBackend.when('GET', testHelper.fullURL('/issues/6')).respond(200, response);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('#init', () => {
      it('should populate issue', () => {
        httpBackend.flush();
        expect(ctrl.issue).toEqual(response.issue);
      });
    });
});
