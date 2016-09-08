import app from '../../app';
  describe('IssuesCtrl', () => {
    let ctrl;
    let httpBackend;
    let response = {
      "issues": [{
        "id": 6,
        "body": "oi",
        "created_at": "2016-09-08T01:06:53.000Z",
        "issue_type": {
          "id": 1,
          "name": "telefone"
        },
        "issue_reason": {
          "id": 1,
          "name": "duvidas"
        },
        "customer": {
          "id": 1,
          "name": "Raissa Ferreira",
          "email": "rai200890@gmail.com",
          "phone": "22222222",
          "id_card_code": "1243456789"
        },
        "state": {
          "id": 1,
          "abbreviation": "AC",
          "name": "Acre"
        }
      }],
      "meta": {
        "current_page": 1,
        "next_page": null,
        "prev_page": null,
        "total_pages": 1,
        "total_count": 1
      }
    };

    beforeEach(() => {
      angular.mock.module(app);
      angular.mock.inject(($controller, $httpBackend) => {
        ctrl = $controller('IssuesCtrl', {});
        httpBackend = $httpBackend;
      });

      httpBackend.when('GET', 'http://localhost:3000/issues?per=15').respond(200, response);
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
