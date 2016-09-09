import app from '../../app';
  describe('ShowIssueCtrl', () => {
    let ctrl;
    let httpBackend;
    let response = {
      "issue": {
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
      }
    };

    let fullURL = (path) => {
      let baseURL = 'http://localhost:3000/api/v1';
      return baseURL + path
    };

    beforeEach(() => {
      angular.mock.module(app);
      angular.mock.inject(($controller, $httpBackend) => {
        ctrl = $controller('ShowIssueCtrl', {$stateParams: {id: 6}});
        httpBackend = $httpBackend;
      });

      httpBackend.when('GET', fullURL('/issues/6')).respond(200, response);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('#init', () => {
      it('should populate issue', () => {
        httpBackend.flush();
        expect(ctrl.issue).toEqual(response['issue']);
      });
    });
});
