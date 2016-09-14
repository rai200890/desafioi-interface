import testHelper from "../helper.spec"
import response from 'json!../fixtures/issue.json';

describe('ShowIssueCtrl', () => {
  let ctrl;
  let httpBackend;

  beforeEach(() => {
    angular.mock.module(testHelper.app);
    angular.mock.inject(($controller, $httpBackend) => {
      ctrl = $controller('ShowIssueCtrl', {
        $stateParams: {
          id: 6
        }
      });
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
