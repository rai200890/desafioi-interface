import testHelper from "../helper.spec"

  describe('IssuesCtrl', () => {
    let ctrl;
    let httpBackend;
    let response = require('json!../fixtures/issues.json');

    beforeEach(() => {
      angular.mock.module(testHelper.app);
      angular.mock.inject(($controller, $httpBackend) => {
        ctrl = $controller('IssuesCtrl', {});
        httpBackend = $httpBackend;
      });

      httpBackend.when('GET', testHelper.fullURL('/issues?per=15')).respond(200, response);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('#fetch', () => {
      it('should contain a list of issues', () => {
        let tableState = {
          pagination: {
            number: 15,
            start: 0,
            totalItemCount: 0
          }
        };
        ctrl.fetch(tableState);
        expect(ctrl.isLoading).toBe(true);
        httpBackend.flush();

        expect(ctrl.issues).toEqual(response.issues);
        expect(ctrl.meta).toEqual(response.meta);
        expect(ctrl.isLoading).toBe(false);
        expect(tableState.pagination.numberOfPages).toBe(1);
      });
    });
  });
